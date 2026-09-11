"use client";

import { useState } from "react";

const SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

export default function BookingForm({ service, city }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="border border-moss/30 bg-moss/5 p-6">
        <p className="font-display text-xl text-moss-dark">
          Booking requested
        </p>
        <p className="mt-2 text-sm text-ink/70">
          {service.name} on {date} at {slot}. A professional will be
          assigned and you&rsquo;ll get a confirmation by SMS.
        </p>
      </div>
    );
  }

  const steps = [
    { n: 1, label: "Time" },
    { n: 2, label: "Address" },
    { n: 3, label: "Confirm" },
  ];

  return (
    <div>
      <ol className="flex gap-6 text-sm mb-8">
        {steps.map((s) => (
          <li
            key={s.n}
            className={`flex items-center gap-2 ${
              step === s.n ? "text-ink" : "text-ink/35"
            }`}
          >
            <span
              className={`w-5 h-5 flex items-center justify-center text-xs border ${
                step === s.n ? "border-brand text-brand" : "border-ink/20"
              }`}
            >
              {s.n}
            </span>
            {s.label}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div>
          <label className="block text-sm text-ink/60 mb-2">
            Pick a date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-ink/20 bg-paper px-4 py-3 mb-6"
          />
          <label className="block text-sm text-ink/60 mb-2">
            Pick a time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {SLOTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={`border px-3 py-2 text-sm transition-colors ${
                  slot === s
                    ? "border-brand bg-brand/10 text-brand-dark"
                    : "border-ink/20 hover:border-ink/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!date || !slot}
            onClick={() => setStep(2)}
            className="mt-8 w-full bg-ink text-mist py-3 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block text-sm text-ink/60 mb-2">
            Service address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            placeholder={`Flat / house number, street, ${city.name}`}
            className="w-full border border-ink/20 bg-paper px-4 py-3 mb-6"
          />
          <label className="block text-sm text-ink/60 mb-2">
            Phone number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            className="w-full border border-ink/20 bg-paper px-4 py-3"
          />
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 border border-ink/20 py-3"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!address || !phone}
              onClick={() => setStep(3)}
              className="flex-1 bg-ink text-mist py-3 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="border border-ink/10 divide-y divide-ink/10 text-sm">
            <div className="flex justify-between px-4 py-3">
              <span className="text-ink/50">Service</span>
              <span>{service.name}</span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-ink/50">When</span>
              <span>
                {date}, {slot}
              </span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-ink/50">Address</span>
              <span className="text-right max-w-[60%]">{address}</span>
            </div>
            <div className="flex justify-between px-4 py-3">
              <span className="text-ink/50">Estimated price</span>
              <span>₹{service.price}</span>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 border border-ink/20 py-3"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setConfirmed(true)}
              className="flex-1 bg-brand text-white py-3 hover:bg-brand-dark transition-colors"
            >
              Confirm booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
