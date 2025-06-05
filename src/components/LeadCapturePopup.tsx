import * as React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Mail, User, Phone, Globe, FileClock, UserMinus, Send, CreditCard, MailQuestion, TrendingDown, CalendarClock, CheckCircle, ArrowRight } from "lucide-react";
import { addHours, format, isToday, setHours, setMinutes, startOfDay, isBefore, parseISO } from "date-fns";
import { toZonedTime, toDate } from "date-fns-tz";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// Optionally import a DatePicker (or build simple one)

const SOLUTION_OPTIONS = [
  { key: "slow_proposals", label: "Slow Proposals", icon: FileClock },
  { key: "missed_leads", label: "Missed Leads", icon: UserMinus },
  { key: "delayed_outreach", label: "Delayed Outreach", icon: Send },
  { key: "slow_payments", label: "Slow Payments", icon: CreditCard },
  { key: "unsorted_inquiries", label: "Unsorted Inquiries", icon: MailQuestion },
  { key: "stalled_deals", label: "Stalled Deals", icon: TrendingDown },
];

const EASTERN_TZ = "America/New_York";
const BASE_START_HOUR = 8; // 8 AM
const BASE_END_HOUR = 18; // 6 PM
const SLOT_INTERVAL = 30; // minutes

function extractDomain(email: string) {
  const match = email.match(/@([\w.-]+)/);
  return match ? match[1] : "";
}

function getUserTimezone() {
  if (typeof window !== "undefined") {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  return EASTERN_TZ;
}

function generateTimeSlots(date: Date, userTz: string) {
  // Generate slots in Eastern, convert to user's tz, filter by 3-hour minimum notice
  const slots: { label: string; value: Date }[] = [];
  const now = new Date();
  const earliestAllowed = addHours(now, 3); // 3-hour minimum notice
  for (let h = BASE_START_HOUR; h <= BASE_END_HOUR - 1; h++) {
    for (let m = 0; m < 60; m += SLOT_INTERVAL) {
      // Slot start time in GMT-5 (Eastern Time, no DST)
      const slotEastern = setHours(setMinutes(startOfDay(date), m), h);
      // Convert slotEastern to UTC, then to user's tz for display
      const slotUtc = toDate(slotEastern);
      // Only show slots in base window (8:00 to 17:30 inclusive)
      const slotHour = h;
      const slotMinute = m;
      if (slotHour < BASE_START_HOUR || (slotHour === BASE_END_HOUR && slotMinute > 0) || slotHour > BASE_END_HOUR - 1) continue;
      // Convert earliestAllowed (user's local time) to GMT-5 for comparison
      const earliestAllowedEastern = toZonedTime(earliestAllowed, EASTERN_TZ);
      // Only show slots at least 3 hours from now (in GMT-5)
      if (isBefore(slotEastern, earliestAllowedEastern) || isBefore(slotEastern, now)) continue;
      slots.push({
        label: format(slotUtc, "h:mm a"),
        value: slotUtc,
      });
    }
  }
  return slots;
}

export interface LeadCapturePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LeadCapturePopup: React.FC<LeadCapturePopupProps> = ({ open, onOpenChange }) => {
  if (!open) return null;

  // State declarations
  const [emailError, setEmailError] = React.useState<string>('');
  const [phoneError, setPhoneError] = React.useState<string>('');
  const [isEditingWebsite, setIsEditingWebsite] = React.useState(false);
  const [step, setStep] = React.useState(0);

  // Progress bar logic
  const totalSteps = 7; // Adjust if more/less steps
  let progressPercent = Math.round((step / (totalSteps - 1)) * 100);
  progressPercent = Math.max(0, Math.min(progressPercent, 100));
  const progressMessages = [
    "Let's get you to faster revenue!",
    "You're on the fast track!",
    "Just a few more details...",
    "Almost there to faster rev!",
    "Unlocking your business growth...",
    "Ready to boost your business!",
    "Thanks for booking a demo!"
  ];
  const progressMessage = progressMessages[Math.min(step, progressMessages.length - 1)];

  // Comprehensive list of personal/non-business email domains and synonyms
  const personalDomains = [
    'gmail.com','googlemail.com','outlook.com','hotmail.com','live.com','msn.com', 'ymail.com','yahoo.com','yahoo.co.uk','yahoo.co.in','protonmail.com','proton.me','tutanota.com','tuta.io','zoho.com','zoho.eu','icloud.com','me.com','mac.com','gmx.com','gmx.net','mail.com','aol.com','yandex.com','yandex.ru','mailfence.com','contactoffice.com','posteo.de','runbox.com','mailbox.org','disroot.org','kolabnow.com','mykolab.com','mailpile.is','fastmail.com','fastmail.fm','hushmail.com','hush.com','10minutemail.com','guerrillamail.com','tempmail.com','mailinator.com','cock.li','airmail.cc','pissmail.com','simplelogin.com','anonaddy.com','addy.io','relay.firefox.com','mozmail.com','duck.com','duckduckgo.com','privaterelay.appleid.com','mailnesia.com','spamgourmet.com','33mail.com','burnermail.io','trashmail.com','maildrop.cc','inbox.lv','inbox.ru','lycos.com','rediffmail.com','rediff.com','tiscali.it','bluemail.me','mail.ru','qip.ru','seznam.cz','laposte.net','web.de','freenet.de','orange.fr','gmx.ch','netcourrier.com','net-c.com','email.it','libero.it','protonmail.ch','tutanota.de','yandex.com','yandex.ru'
  ];

  // Helper: checks if an email is from a personal domain
  function isPersonalEmail(email: string) {
    const domain = extractDomain(email).toLowerCase();
    return personalDomains.some((d: string) => domain === d);
  }

  const [formData, setFormData] = React.useState({
    email: "",
    fullName: "",
    phone: "",
    websiteDomain: "",
    websiteConfirmed: false,
    solutions: [] as string[],
    selectedDate: null as Date | null,
    selectedTime: null as Date | null,
  });
  const [domain, setDomain] = React.useState("");
  const [showWebsiteConfirm, setShowWebsiteConfirm] = React.useState(false);
  const [userTz, setUserTz] = React.useState(EASTERN_TZ);
  const [availableTimes, setAvailableTimes] = React.useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [finalSelectedDateTime, setFinalSelectedDateTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setUserTz(getUserTimezone());
  }, []);

  React.useEffect(() => {
    if (formData.email) {
      const d = extractDomain(formData.email);
      handleInput('websiteDomain', d);
    }
  }, [formData.email]);

  React.useEffect(() => {
    if (step === 5) {
      const now = new Date();
      const gmt5 = 'America/New_York';
      const nowInGmt5 = toZonedTime(now, gmt5);
      const currentHour = nowInGmt5.getHours();
      const currentMinute = nowInGmt5.getMinutes();
      let dateToSelect: Date;
      // On first entry, default to today or tomorrow based on time
      if (!selectedDate) {
        const initial = ((currentHour > 14) || (currentHour === 14 && currentMinute >= 30))
          ? startOfDay(addHours(nowInGmt5, 24))
          : startOfDay(nowInGmt5);
        dateToSelect = initial;
        setSelectedDate(initial);
      } else {
        dateToSelect = selectedDate;
      }
      if (!dateToSelect) {
        setAvailableTimes([]);
        return;
      }
      // Generate slots from 8:00 to 17:30 GMT-5
      const slots: Date[] = [];
      for (let h = 8; h <= 17; h++) {
        for (let m of [0, 30]) {
          if (h === 17 && m > 0) continue;
          const slotGmt5 = setHours(setMinutes(startOfDay(dateToSelect), m), h);
          const slotUtc = toDate(slotGmt5);
          // Exclude past slots only
          if (slotUtc.getTime() <= now.getTime()) continue;
          slots.push(slotUtc);
        }
      }
      setAvailableTimes(slots);
    }
  }, [step, selectedDate]);

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => Math.max(0, s - 1));
  const handleInput = (field: string, value: any) => setFormData((d) => ({ ...d, [field]: value }));

  const steps = [
    // Step 1: Email
    (
      <motion.div key="step1" className="w-full flex flex-col items-center text-center" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
        <div className="flex flex-col gap-6 max-w-xl items-center justify-center min-h-[300px]">
          <div className="flex items-center gap-3 text-2xl font-bold mb-4 justify-center text-center">
            <Mail className="w-8 h-8 text-primary" />
            What's your business email?
          </div>
          <input
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => { handleInput("email", e.target.value); setEmailError(''); }}
            className="border rounded px-4 py-2 focus:ring-2 focus:ring-primary mb-2 text-center placeholder:text-center w-10/12 mx-auto"
            style={{ width: 'calc(100% - 20px)' }}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
                if (isPersonalEmail(formData.email)) {
                  setEmailError('Please use your business email address.');
                  return;
                }
                handleNext();
              }
            }}
          />
          {emailError && <p className="text-red-600 text-sm mb-4">{emailError}</p>}
          <button
            disabled={!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)}
            onClick={() => {
              if (isPersonalEmail(formData.email)) {
                setEmailError('Please use your business email address.');
                return;
              }
              handleNext();
            }}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 mx-auto"
          >
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
    ),
    // Step 2: Full Name
    (
      <motion.div key="step2" className="w-full flex flex-col items-center text-center" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
        <div className="flex flex-col items-center w-full gap-6 max-w-xl justify-center min-h-[300px]">
          <div className="flex items-center gap-3 text-2xl font-bold mb-4 text-center">
            <User className="w-8 h-8 text-primary" />
            What's your full name?
          </div>
          <input
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => handleInput("fullName", e.target.value)}
            className="border rounded px-4 py-2 focus:ring-2 focus:ring-primary mb-4 text-center w-10/12 mx-auto"
            style={{ width: 'calc(100% - 20px)' }}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter' && formData.fullName) handleNext();
            }}
          />
          <button
            disabled={!formData.fullName}
            onClick={handleNext}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 mx-auto"
          >
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
    ),
    // Step 3: Phone Number
    (
      <motion.div key="step3" className="w-full flex flex-col items-center text-center" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
        <div className="flex flex-col items-center w-full gap-6 max-w-xl justify-center min-h-[300px]">
          <div className="flex items-center gap-3 text-2xl font-bold mb-4 text-center">
            <Phone className="w-8 h-8 text-primary" />
            What's your cell number?
          </div>
          <div className="w-full flex flex-col items-center" onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') {
              const phone = formData.phone || '';
              if (!/^[0-9]{10,13}$/.test(phone)) {
                setPhoneError('Please enter a valid mobile number (10-13 digits).');
                return;
              }
              setPhoneError('');
              handleNext();
            }
          }}>
            <PhoneInput
              defaultCountry="us"
              value={formData.phone}
              onChange={(phone, countryData) => {
                // Only allow digits, but do not artificially truncate
                const digits = phone.replace(/\D/g, '');
                handleInput("phone", digits);
              }}
              className="mb-2 w-11/12 mx-auto"
              inputClassName="text-center w-11/12 mx-auto"
              autoFocus
              preferredCountries={['us','ca','gb']}
            />
          </div>
          {phoneError && <p className="text-red-600 text-sm mb-4">{phoneError}</p>}
          <button
            disabled={!formData.phone}
            onClick={() => {
              const phone = formData.phone || '';
              if (!/^[0-9]{10,13}$/.test(phone)) {
                setPhoneError('Please enter a valid mobile number (10-13 digits).');
                return;
              }
              setPhoneError('');
              handleNext();
            }}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 mx-auto"
          >
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
    ),
    // Step 4: Website
    (
      <motion.div key="step4" className="w-full flex flex-col items-center text-center" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
        <div className="flex flex-col items-center w-full gap-6 max-w-xl justify-center min-h-[300px]">
          <div className="flex items-center gap-3 text-2xl font-bold mb-4 text-center">
            <Globe className="w-8 h-8 text-primary" />
            What's
          </div>
          <p className="text-lg font-medium mb-4 text-center">We'll use this to learn more about your business.</p>
          <div className="flex items-center gap-3 text-lg font-medium mb-4">
            <Globe className="w-6 h-6 text-primary" />
            {formData.websiteDomain}
          </div>
          <p className="text-lg font-medium mb-4 text-center">
            Is this correct?
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => { handleInput("websiteConfirmed", true); setIsEditingWebsite(false); handleNext(); }}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
            >
              Yes, Looks Right
            </button>
            <button
              onClick={() => { setIsEditingWebsite(true); }}
              className="border px-6 py-2 rounded hover:border-primary"
            >
              No, Edit Website
            </button>
          </div>
          {isEditingWebsite && (
            <div className="flex flex-col gap-2 mb-4 mt-4">
              <label className="text-sm font-medium">Correct Website Domain:</label>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                <input
                  value={formData.websiteDomain}
                  onChange={(e) => handleInput('websiteDomain', e.target.value)}
                  className="border rounded px-4 py-2 flex-1 focus:ring-2 focus:ring-primary"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && formData.websiteDomain) {
                      handleInput('websiteConfirmed', true);
                      setIsEditingWebsite(false);
                      handleNext();
                    }
                  }}
                />
              </div>
              <button
                onClick={() => { handleInput('websiteConfirmed', true); setIsEditingWebsite(false); handleNext(); }}
                className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 mx-auto"
              >Confirm & Next</button>
            </div>
          )}
        </div>
      </motion.div>
    ),
    // Step 5: Solutions
    (
      <motion.div key="step5" className="w-full flex flex-col items-center text-center" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
        <div className="flex flex-col items-center w-full gap-6 max-w-xl justify-center min-h-[300px]">
          <div className="flex items-center gap-3 text-2xl font-bold mb-4 text-center">
            <MailQuestion className="w-8 h-8 text-primary" />
            Which solutions interest you?
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {SOLUTION_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const selected = formData.solutions.includes(opt.key);
              return (
                <button
                  key={opt.key}
                  type="button"
                  className={`flex flex-col items-center justify-center border rounded-lg p-4 gap-2 transition-all cursor-pointer focus:outline-none ${selected ? "border-primary bg-primary/10" : "border-muted bg-background"}`}
                  onClick={() => {
                    setFormData((d) => ({
                      ...d,
                      solutions: selected
                        ? d.solutions.filter((k) => k !== opt.key)
                        : [...d.solutions, opt.key],
                    }));
                  }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-medium text-center text-sm">{opt.label}</span>
                  {selected && <CheckCircle className="w-4 h-4 text-primary" />}
                </button>
              );
            })}
          </div>
          <button
            disabled={formData.solutions.length === 0}
            onClick={handleNext}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 mx-auto"
          >
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
    ),
    // Step 6: Availability (Calendly style)
    (
      <motion.div key="step6" className="w-full text-center md:overflow-visible" style={{ maxHeight: '100vh' }} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
        <h2 className="text-2xl font-bold mb-4">Your Time</h2>
        <div className="block md:hidden text-xs text-gray-400 mb-2">Scroll to select and confirm your time</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto max-h-[70vh] overflow-y-auto md:overflow-visible p-2 md:p-0" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Calendar Picker */}
          <div>
            <ReactDatePicker
              inline
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setSelectedDate(date);
                  setFinalSelectedDateTime(null);
                }
              }}
              minDate={new Date()}
              filterDate={(date: Date) => {
                const day = date.getDay();
                return day !== 0 && day !== 6; // Disable Sundays (0) and Saturdays (6)
              }}
              calendarClassName="rounded-xl shadow-lg border bg-white p-2"
              dayClassName={(date: Date) =>
                `transition-all rounded-full w-10 h-10 flex items-center justify-center mx-auto text-base ` +
                (selectedDate && date.toDateString() === selectedDate.toDateString()
                  ? 'bg-primary text-white font-bold shadow'
                  : 'hover:bg-primary/10 hover:text-primary')
              }
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }: { date: Date; decreaseMonth: () => void; increaseMonth: () => void; }) => (
                <div className="flex justify-between items-center mb-2 px-2">
                  <button onClick={decreaseMonth} className="p-1 rounded hover:bg-primary/10 text-primary" aria-label="Previous Month">&#8592;</button>
                  <span className="font-semibold text-lg">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                  <button onClick={increaseMonth} className="p-1 rounded hover:bg-primary/10 text-primary" aria-label="Next Month">&#8594;</button>
                </div>
              )}
            />
            <div className="mt-3 text-xs text-gray-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 inline"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17v2m0 0c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h12a2 2 0 012 2v8c0 2.21-3.582 4-8 4z" /></svg>
              {`Time zone: ${userTz.replace('_', ' ')}`}
            </div>
          </div>
          {/* Time Slots */}
          <div>
            <label className="font-medium mb-2 block">Select Time</label>
            <div className="grid grid-cols-3 gap-2">
              {selectedDate && availableTimes.filter(slot => slot.getTime() > new Date().getTime()).map(slot => {
                const local = toZonedTime(slot, Intl.DateTimeFormat().resolvedOptions().timeZone);
                const label = format(local, 'h:mm a');
                return (
                  <button
                    key={slot.toISOString()}
                    type="button"
                    className={`py-2 px-4 border rounded-md hover:bg-primary hover:text-white ${finalSelectedDateTime?.getTime() === slot.getTime() ? 'bg-primary text-white' : ''}`}
                    onClick={() => setFinalSelectedDateTime(slot)}
                  >{label}</button>
                );
              })}
              {!selectedDate && <span className="col-span-3 text-sm text-muted-foreground">Pick a date</span>}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-6 max-w-xl mx-auto">
          <button onClick={handleBack} className="border border-primary text-primary py-2 px-4 rounded-md">Back</button>
          <button
            onClick={() => {
              const payload = {
                email: formData.email,
                fullName: formData.fullName,
                phone: formData.phone,
                websiteDomain: formData.websiteDomain,
                solutions: formData.solutions,
                selectedDate: selectedDate?.toISOString(),
                selectedTime: finalSelectedDateTime?.toISOString(),
                timezone: userTz,
              };
              axios.post(process.env.NEXT_PUBLIC_n8n_webhook!, payload)
                .then(response => {
                  console.log('Booking response:', response.data);
                  handleNext();
                })
                .catch(error => {
                  console.error('Booking error:', error);
                });
              console.log('Booking payload:', payload);
              console.log(JSON.stringify(payload, null, 2));
              handleNext();
            }}
            disabled={!finalSelectedDateTime}
            className="bg-primary text-white py-2 px-4 rounded-md disabled:opacity-50"
          >Book Meeting</button>
        </div>
      </motion.div>
    ),
    // Step 7: Confirmation
    (
      <motion.div key="step7" className="w-full text-center" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
        <h2 className="text-2xl font-bold mb-2">Thanks, {formData.fullName}!</h2>
        <p>Your demo is booked for {finalSelectedDateTime ? format(toZonedTime(finalSelectedDateTime, userTz), 'PPpp') : ''}.</p>
        {finalSelectedDateTime && isBefore(finalSelectedDateTime, addHours(new Date(), 24)) && (
          <p className="mt-2 italic text-sm text-muted-foreground">Our team will try our best to facilitate this meeting and will reach out shortly!</p>
        )}
        <div className="mt-6">
          <button onClick={() => onOpenChange(false)} className="bg-primary text-white py-2 px-4 rounded-md">Close</button>
        </div>
      </motion.div>
    ),
  ];

  // --- Main Render ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full relative flex flex-col">
          {/* Progress Bar */}
          <div className="w-full px-8 pt-6">
            <div className="flex flex-col items-center mb-2">
              <span className="text-xs font-semibold text-primary mb-1 tracking-wide">{progressMessage}</span>
              <div className="w-full bg-gray-200 rounded-full h-4 relative">
                <div
                  className="bg-gradient-to-r from-primary to-blue-400 h-4 rounded-full transition-all duration-300 flex items-center justify-center"
                  style={{ width: `${progressPercent}%` }}
                >
                  <span className="w-full text-center text-xs font-bold text-white absolute left-0 top-1/2 -translate-y-1/2">{progressPercent}%</span>
                </div>
              </div>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <AnimatePresence mode="wait">
            {steps[step]}
          </AnimatePresence>
          {step > 0 && step < steps.length - 1 && (
            <button
              type="button"
              className="absolute left-4 top-4 text-muted-foreground hover:text-primary"
              onClick={handleBack}
              aria-label="Back"
            >
              ←
            </button>
          )}
          {/* Bottom encouragement message */}
          <div className="w-full px-8 pb-3 mt-auto">
            <p className="text-xs text-gray-400 text-center">One Minute can boost your business</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCapturePopup;
