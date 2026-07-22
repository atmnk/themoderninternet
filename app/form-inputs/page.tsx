"use client";

import { FormEvent, useState } from "react";
import { Button, Checkbox } from "@heroui/react";

import { subtitle, title } from "@/components/primitives";

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  bio: string;
};

type CheckoutForm = {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  deliveryWindow: string;
  giftWrap: boolean;
};

type BillingForm = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  plan: string;
  agreeToTerms: boolean;
};

type SupportForm = {
  subject: string;
  priority: string;
  orderId: string;
  issueType: string;
  details: string;
  contactBack: boolean;
};

type ErrorMap = Record<string, string>;

const initialProfile: ProfileForm = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  bio: "",
};

const initialCheckout: CheckoutForm = {
  address: "",
  city: "",
  country: "",
  postalCode: "",
  deliveryWindow: "",
  giftWrap: false,
};

const initialBilling: BillingForm = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  plan: "",
  agreeToTerms: false,
};

const initialSupport: SupportForm = {
  subject: "",
  priority: "medium",
  orderId: "",
  issueType: "",
  details: "",
  contactBack: true,
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateProfile(form: ProfileForm) {
  const errors: ErrorMap = {};

  if (form.fullName.trim().length < 3) {
    errors.fullName = "Enter a full name with at least 3 characters.";
  }

  if (!validateEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!/^\+?[0-9\s\-()]{8,}$/.test(form.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!form.role) {
    errors.role = "Select a role.";
  }

  if (form.bio.trim().length < 20) {
    errors.bio = "Add at least 20 characters describing the account.";
  }

  return errors;
}

function validateCheckout(form: CheckoutForm) {
  const errors: ErrorMap = {};

  if (form.address.trim().length < 8) {
    errors.address = "Enter a more complete street address.";
  }

  if (form.city.trim().length < 2) {
    errors.city = "Enter a city.";
  }

  if (!form.country) {
    errors.country = "Choose a country.";
  }

  if (!/^[A-Za-z0-9\- ]{4,10}$/.test(form.postalCode.trim())) {
    errors.postalCode = "Enter a valid postal code.";
  }

  if (!form.deliveryWindow) {
    errors.deliveryWindow = "Choose a delivery window.";
  }

  return errors;
}

function validateBilling(form: BillingForm) {
  const errors: ErrorMap = {};
  const digitsOnly = form.cardNumber.replace(/\s+/g, "");

  if (form.cardName.trim().length < 3) {
    errors.cardName = "Enter the cardholder name.";
  }

  if (!/^[0-9]{16}$/.test(digitsOnly)) {
    errors.cardNumber = "Card number must be 16 digits.";
  }

  if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(form.expiry)) {
    errors.expiry = "Use MM/YY format.";
  }

  if (!/^[0-9]{3,4}$/.test(form.cvv)) {
    errors.cvv = "Enter a 3 or 4 digit security code.";
  }

  if (!form.plan) {
    errors.plan = "Select a billing plan.";
  }

  if (!form.agreeToTerms) {
    errors.agreeToTerms = "You must accept the terms to continue.";
  }

  return errors;
}

function validateSupport(form: SupportForm) {
  const errors: ErrorMap = {};

  if (form.subject.trim().length < 5) {
    errors.subject = "Enter a short ticket title.";
  }

  if (!form.issueType) {
    errors.issueType = "Choose an issue type.";
  }

  if (form.orderId.trim() && !/^ORD-[0-9]{5,}$/.test(form.orderId.trim())) {
    errors.orderId = "Order ID should look like ORD-12345.";
  }

  if (form.details.trim().length < 30) {
    errors.details = "Describe the issue in at least 30 characters.";
  }

  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-danger-soft-foreground">{message}</p>;
}

export default function FormInputsPage() {
  const [profileForm, setProfileForm] = useState(initialProfile);
  const [checkoutForm, setCheckoutForm] = useState(initialCheckout);
  const [billingForm, setBillingForm] = useState(initialBilling);
  const [supportForm, setSupportForm] = useState(initialSupport);

  const [profileErrors, setProfileErrors] = useState<ErrorMap>({});
  const [checkoutErrors, setCheckoutErrors] = useState<ErrorMap>({});
  const [billingErrors, setBillingErrors] = useState<ErrorMap>({});
  const [supportErrors, setSupportErrors] = useState<ErrorMap>({});

  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);
  const [billingSuccess, setBillingSuccess] = useState<string | null>(null);
  const [supportSuccess, setSupportSuccess] = useState<string | null>(null);

  const handleProfileSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateProfile(profileForm);

    setProfileErrors(errors);
    setProfileSuccess(
      Object.keys(errors).length === 0
        ? `Profile created for ${profileForm.fullName}.`
        : null,
    );
  };

  const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateCheckout(checkoutForm);

    setCheckoutErrors(errors);
    setCheckoutSuccess(
      Object.keys(errors).length === 0
        ? `Shipping saved for ${checkoutForm.city}, ${checkoutForm.country}.`
        : null,
    );
  };

  const handleBillingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateBilling(billingForm);

    setBillingErrors(errors);
    setBillingSuccess(
      Object.keys(errors).length === 0
        ? `Billing details accepted for the ${billingForm.plan} plan.`
        : null,
    );
  };

  const handleSupportSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateSupport(supportForm);

    setSupportErrors(errors);
    setSupportSuccess(
      Object.keys(errors).length === 0
        ? `Support ticket drafted with ${supportForm.priority} priority.`
        : null,
    );
  };

  return (
    <section className="space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-separator bg-surface px-6 py-10 shadow-surface backdrop-blur md:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-[var(--accent-soft)] blur-3xl" />
        <div className="relative space-y-5">
          <span className="inline-flex rounded-full border border-separator bg-surface-secondary px-3 py-1 text-sm text-foreground">
            Complex Form Sample
          </span>

          <div className="max-w-3xl space-y-4">
            <h1 className={title({ size: "lg" })}>Form Inputs</h1>
            <p className={subtitle({ class: "max-w-3xl" })}>
              This page combines several real-life forms on a single screen:
              account setup, shipping details, billing, and support intake.
              It is meant for practicing text entry, selects, radios, checkboxes,
              textareas, validation messages, and section-specific submission flows.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-6">
          <form
            className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface"
            data-testid="profile-form"
            onSubmit={handleProfileSubmit}
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Account setup
              </h2>
              <p className="text-sm text-muted">
                A realistic onboarding form with text inputs and a role selector.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-foreground">Full name</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="profile-full-name"
                  placeholder="Ava Johnson"
                  value={profileForm.fullName}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      fullName: event.target.value,
                    }))
                  }
                />
                <FieldError message={profileErrors.fullName} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Email</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="profile-email"
                  placeholder="ava@company.com"
                  type="email"
                  value={profileForm.email}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
                <FieldError message={profileErrors.email} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Phone</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="profile-phone"
                  placeholder="+1 555 123 4567"
                  value={profileForm.phone}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                />
                <FieldError message={profileErrors.phone} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Role</span>
                <select
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="profile-role"
                  value={profileForm.role}
                  onChange={(event) =>
                    setProfileForm((current) => ({
                      ...current,
                      role: event.target.value,
                    }))
                  }
                >
                  <option value="">Select a role</option>
                  <option value="qa-engineer">QA Engineer</option>
                  <option value="product-manager">Product Manager</option>
                  <option value="support-lead">Support Lead</option>
                  <option value="growth-analyst">Growth Analyst</option>
                </select>
                <FieldError message={profileErrors.role} />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-medium text-foreground">Bio</span>
              <textarea
                className="mt-2 min-h-28 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                data-testid="profile-bio"
                placeholder="Tell us how this account will be used."
                value={profileForm.bio}
                onChange={(event) =>
                  setProfileForm((current) => ({
                    ...current,
                    bio: event.target.value,
                  }))
                }
              />
              <FieldError message={profileErrors.bio} />
            </label>

            <div className="mt-5 flex items-center gap-4">
              <Button className="rounded-full" type="submit" variant="primary">
                Create profile
              </Button>
              {profileSuccess ? (
                <p className="text-sm text-success-soft-foreground" data-testid="profile-success">
                  {profileSuccess}
                </p>
              ) : null}
            </div>
          </form>

          <form
            className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface"
            data-testid="checkout-form"
            onSubmit={handleCheckoutSubmit}
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Shipping details
              </h2>
              <p className="text-sm text-muted">
                Address fields, a dropdown, and a shipping preference group.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Street address</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="checkout-address"
                  placeholder="420 Market Street"
                  value={checkoutForm.address}
                  onChange={(event) =>
                    setCheckoutForm((current) => ({
                      ...current,
                      address: event.target.value,
                    }))
                  }
                />
                <FieldError message={checkoutErrors.address} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">City</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="checkout-city"
                  placeholder="San Francisco"
                  value={checkoutForm.city}
                  onChange={(event) =>
                    setCheckoutForm((current) => ({
                      ...current,
                      city: event.target.value,
                    }))
                  }
                />
                <FieldError message={checkoutErrors.city} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Country</span>
                <select
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="checkout-country"
                  value={checkoutForm.country}
                  onChange={(event) =>
                    setCheckoutForm((current) => ({
                      ...current,
                      country: event.target.value,
                    }))
                  }
                >
                  <option value="">Select a country</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="India">India</option>
                </select>
                <FieldError message={checkoutErrors.country} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Postal code</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="checkout-postal-code"
                  placeholder="94105"
                  value={checkoutForm.postalCode}
                  onChange={(event) =>
                    setCheckoutForm((current) => ({
                      ...current,
                      postalCode: event.target.value,
                    }))
                  }
                />
                <FieldError message={checkoutErrors.postalCode} />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-foreground">
                Delivery window
              </legend>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {[
                  { value: "morning", label: "Morning" },
                  { value: "afternoon", label: "Afternoon" },
                  { value: "evening", label: "Evening" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground"
                  >
                    <input
                      checked={checkoutForm.deliveryWindow === option.value}
                      data-testid={`delivery-${option.value}`}
                      name="delivery-window"
                      type="radio"
                      value={option.value}
                      onChange={(event) =>
                        setCheckoutForm((current) => ({
                          ...current,
                          deliveryWindow: event.target.value,
                        }))
                      }
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              <FieldError message={checkoutErrors.deliveryWindow} />
            </fieldset>

            <div className="mt-4">
              <Checkbox
                data-testid="checkout-gift-wrap"
                isSelected={checkoutForm.giftWrap}
                onChange={(isSelected) =>
                  setCheckoutForm((current) => ({
                    ...current,
                    giftWrap: isSelected,
                  }))
                }
              >
                Add gift wrap and a printed note
              </Checkbox>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <Button className="rounded-full" type="submit" variant="primary">
                Save shipping
              </Button>
              {checkoutSuccess ? (
                <p className="text-sm text-success-soft-foreground" data-testid="checkout-success">
                  {checkoutSuccess}
                </p>
              ) : null}
            </div>
          </form>

          <form
            className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface"
            data-testid="billing-form"
            onSubmit={handleBillingSubmit}
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Billing and subscription
              </h2>
              <p className="text-sm text-muted">
                Payment-style fields with masked formats, a plan selection, and a required agreement.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Cardholder name</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="billing-card-name"
                  placeholder="Ava Johnson"
                  value={billingForm.cardName}
                  onChange={(event) =>
                    setBillingForm((current) => ({
                      ...current,
                      cardName: event.target.value,
                    }))
                  }
                />
                <FieldError message={billingErrors.cardName} />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Card number</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="billing-card-number"
                  inputMode="numeric"
                  placeholder="4242424242424242"
                  value={billingForm.cardNumber}
                  onChange={(event) =>
                    setBillingForm((current) => ({
                      ...current,
                      cardNumber: event.target.value.replace(/[^0-9\s]/g, ""),
                    }))
                  }
                />
                <FieldError message={billingErrors.cardNumber} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Expiry</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="billing-expiry"
                  placeholder="08/28"
                  value={billingForm.expiry}
                  onChange={(event) =>
                    setBillingForm((current) => ({
                      ...current,
                      expiry: event.target.value,
                    }))
                  }
                />
                <FieldError message={billingErrors.expiry} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">CVV</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="billing-cvv"
                  inputMode="numeric"
                  placeholder="123"
                  value={billingForm.cvv}
                  onChange={(event) =>
                    setBillingForm((current) => ({
                      ...current,
                      cvv: event.target.value.replace(/[^0-9]/g, ""),
                    }))
                  }
                />
                <FieldError message={billingErrors.cvv} />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-foreground">
                Subscription plan
              </legend>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {[
                  { value: "starter", label: "Starter" },
                  { value: "team", label: "Team" },
                  { value: "enterprise", label: "Enterprise" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground"
                  >
                    <input
                      checked={billingForm.plan === option.value}
                      data-testid={`plan-${option.value}`}
                      name="billing-plan"
                      type="radio"
                      value={option.value}
                      onChange={(event) =>
                        setBillingForm((current) => ({
                          ...current,
                          plan: event.target.value,
                        }))
                      }
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              <FieldError message={billingErrors.plan} />
            </fieldset>

            <div className="mt-4">
              <Checkbox
                data-testid="billing-terms"
                isSelected={billingForm.agreeToTerms}
                onChange={(isSelected) =>
                  setBillingForm((current) => ({
                    ...current,
                    agreeToTerms: isSelected,
                  }))
                }
              >
                I agree to the billing terms and renewal policy
              </Checkbox>
              <FieldError message={billingErrors.agreeToTerms} />
            </div>

            <div className="mt-5 flex items-center gap-4">
              <Button className="rounded-full" type="submit" variant="primary">
                Confirm billing
              </Button>
              {billingSuccess ? (
                <p className="text-sm text-success-soft-foreground" data-testid="billing-success">
                  {billingSuccess}
                </p>
              ) : null}
            </div>
          </form>

          <form
            className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface"
            data-testid="support-form"
            onSubmit={handleSupportSubmit}
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Support request
              </h2>
              <p className="text-sm text-muted">
                A ticket form with issue categories, optional reference data, and a long-text explanation field.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Subject</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="support-subject"
                  placeholder="Unable to export invoice"
                  value={supportForm.subject}
                  onChange={(event) =>
                    setSupportForm((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                />
                <FieldError message={supportErrors.subject} />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Priority</span>
                <select
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="support-priority"
                  value={supportForm.priority}
                  onChange={(event) =>
                    setSupportForm((current) => ({
                      ...current,
                      priority: event.target.value,
                    }))
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground">Issue type</span>
                <select
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="support-issue-type"
                  value={supportForm.issueType}
                  onChange={(event) =>
                    setSupportForm((current) => ({
                      ...current,
                      issueType: event.target.value,
                    }))
                  }
                >
                  <option value="">Select an issue type</option>
                  <option value="billing">Billing</option>
                  <option value="login">Login</option>
                  <option value="orders">Orders</option>
                  <option value="automation">Automation bug</option>
                </select>
                <FieldError message={supportErrors.issueType} />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-foreground">Order ID</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                  data-testid="support-order-id"
                  placeholder="ORD-12345"
                  value={supportForm.orderId}
                  onChange={(event) =>
                    setSupportForm((current) => ({
                      ...current,
                      orderId: event.target.value,
                    }))
                  }
                />
                <FieldError message={supportErrors.orderId} />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-medium text-foreground">Issue details</span>
              <textarea
                className="mt-2 min-h-32 w-full rounded-2xl border border-separator bg-background-secondary px-4 py-3 text-foreground outline-none"
                data-testid="support-details"
                placeholder="Describe what happened, what you expected, and any steps to reproduce."
                value={supportForm.details}
                onChange={(event) =>
                  setSupportForm((current) => ({
                    ...current,
                    details: event.target.value,
                  }))
                }
              />
              <FieldError message={supportErrors.details} />
            </label>

            <div className="mt-4">
              <Checkbox
                data-testid="support-contact-back"
                isSelected={supportForm.contactBack}
                onChange={(isSelected) =>
                  setSupportForm((current) => ({
                    ...current,
                    contactBack: isSelected,
                  }))
                }
              >
                Email me when there is an update on this ticket
              </Checkbox>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <Button className="rounded-full" type="submit" variant="primary">
                Submit request
              </Button>
              {supportSuccess ? (
                <p className="text-sm text-success-soft-foreground" data-testid="support-success">
                  {supportSuccess}
                </p>
              ) : null}
            </div>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-xl font-semibold text-foreground">
              Automation notes
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>Each form validates independently and shows inline errors after submit.</li>
              <li>Field types include text, email, phone, select, radio, checkbox, and textarea.</li>
              <li>Success messages are section-specific and update without leaving the page.</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-separator bg-surface p-6 shadow-surface">
            <h2 className="text-xl font-semibold text-foreground">
              Good assertions
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>Required field validation appears only after submission.</li>
              <li>Different forms can be filled without affecting neighboring sections.</li>
              <li>Radio and checkbox states persist while other inputs change.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
