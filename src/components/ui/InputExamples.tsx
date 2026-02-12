import { useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import {
  Mail,
  User,
  Lock,
  Phone,
  Search,
  DollarSign,
  MapPin,
  Calendar,
  CreditCard,
} from "lucide-react";

/**
 * Input Components Examples
 * Demonstrates all features of Input, Textarea, and Select components
 */
export default function InputExamples() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    search: "",
    price: "",
    bio: "",
    country: "",
    city: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "ng", label: "Nigeria" },
    { value: "gh", label: "Ghana" },
  ];

  const cityOptions = [
    { value: "ny", label: "New York" },
    { value: "la", label: "Los Angeles" },
    { value: "ch", label: "Chicago" },
    { value: "hou", label: "Houston" },
  ];

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Input Components Examples</h1>

        {/* Basic Inputs */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Basic Inputs</h2>
          <div className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              iconName="Mail"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <Input
              label="Username"
              type="text"
              placeholder="Choose a username"
              icon={User}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              helperText="Must be at least 8 characters"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              icon={Phone}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
        </section>

        {/* Input Sizes */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Input Sizes</h2>
          <div className="space-y-4">
            <Input
              label="Small Input"
              inputSize="sm"
              placeholder="Small size"
              iconName="User"
            />
            <Input
              label="Medium Input (Default)"
              inputSize="md"
              placeholder="Medium size"
              iconName="User"
            />
            <Input
              label="Large Input"
              inputSize="lg"
              placeholder="Large size"
              iconName="User"
            />
          </div>
        </section>

        {/* Input with Icons */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Icons & Positions</h2>
          <div className="space-y-4">
            <Input
              label="Search"
              placeholder="Search..."
              icon={Search}
              iconPosition="left"
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              iconName="Mail"
              iconPosition="right"
            />
            <Input label="Calendar" type="date" iconName="Calendar" />
          </div>
        </section>

        {/* Input with Prefix/Suffix */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Prefix & Suffix</h2>
          <div className="space-y-4">
            <Input
              label="Price"
              type="number"
              placeholder="0.00"
              prefix={<DollarSign size={18} />}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <Input
              label="Weight"
              type="number"
              placeholder="Enter weight"
              suffix="kg"
            />
            <Input
              label="Discount"
              type="number"
              placeholder="Enter discount"
              suffix="%"
            />
            <Input
              label="Website"
              type="url"
              placeholder="example.com"
              prefix={<span className="text-sm">https://</span>}
            />
          </div>
        </section>

        {/* Character Count */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Character Count</h2>
          <div className="space-y-4">
            <Input
              label="Short Text"
              placeholder="Max 50 characters"
              maxLength={50}
              showCount
            />
            <Input
              label="Username"
              placeholder="Max 20 characters"
              maxLength={20}
              showCount
              iconName="User"
            />
          </div>
        </section>

        {/* Required & Validation */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Required & Validation</h2>
          <div className="space-y-4">
            <Input
              label="Required Field"
              placeholder="This field is required"
              required
              iconName="User"
            />
            <Input
              label="Email with Error"
              type="email"
              placeholder="your@email.com"
              iconName="Mail"
              error="Please enter a valid email address"
            />
            <Input
              label="Password with Error"
              type="password"
              placeholder="Enter password"
              error="Password must be at least 8 characters"
            />
          </div>
        </section>

        {/* Disabled State */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Disabled State</h2>
          <div className="space-y-4">
            <Input
              label="Disabled Input"
              placeholder="This input is disabled"
              disabled
              value="Cannot edit this"
            />
            <Input
              label="Disabled with Icon"
              placeholder="Disabled"
              iconName="Lock"
              disabled
            />
          </div>
        </section>

        {/* Textarea Examples */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Textarea</h2>
          <div className="space-y-6">
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              helperText="Write a short bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />

            <Textarea
              label="Message (with character count)"
              placeholder="Type your message..."
              maxLength={200}
              showCount
              textareaSize="md"
            />

            <Textarea
              label="Auto-resize Textarea"
              placeholder="This textarea grows as you type..."
              autoResize
              textareaSize="sm"
            />

            <Textarea
              label="Large Textarea"
              placeholder="Large size textarea"
              textareaSize="lg"
            />

            <Textarea
              label="Textarea with Error"
              placeholder="Type something..."
              error="This field is required"
            />
          </div>
        </section>

        {/* Select Examples */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Select</h2>
          <div className="space-y-6">
            <Select
              label="Country"
              placeholder="Select your country"
              options={countryOptions}
              iconName="MapPin"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />

            <Select
              label="City"
              placeholder="Select your city"
              options={cityOptions}
              icon={MapPin}
              helperText="Choose the city you live in"
            />

            <Select
              label="Required Select"
              placeholder="Please select an option"
              options={countryOptions}
              required
            />

            <Select
              label="Select with Error"
              placeholder="Select an option"
              options={countryOptions}
              error="Please select a valid option"
            />

            <Select
              label="Small Select"
              placeholder="Small size"
              options={cityOptions}
              selectSize="sm"
            />

            <Select
              label="Large Select"
              placeholder="Large size"
              options={cityOptions}
              selectSize="lg"
            />
          </div>
        </section>

        {/* Real-World Form Example */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Complete Form Example</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                placeholder="John"
                required
                iconName="User"
              />
              <Input
                label="Last Name"
                placeholder="Doe"
                required
                iconName="User"
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              required
              iconName="Mail"
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              iconName="Phone"
            />

            <Select
              label="Country"
              placeholder="Select your country"
              options={countryOptions}
              required
              iconName="MapPin"
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              required
              helperText="Must be at least 8 characters with numbers and symbols"
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              required
            />

            <Textarea
              label="Additional Information"
              placeholder="Tell us anything else we should know..."
              maxLength={500}
              showCount
            />

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-br from-[#ffda0b] via-[#FFCA08] to-[#ffda0b] rounded-xl font-semibold text-[#1A1A1A] hover:shadow-lg transition-all"
              >
                Submit Form
              </button>
            </div>
          </form>
        </section>

        {/* Different Input Types */}
        <section className="mb-12 bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Different Input Types</h2>
          <div className="space-y-4">
            <Input label="Date" type="date" iconName="Calendar" />
            <Input label="Time" type="time" iconName="Clock" />
            <Input
              label="Number"
              type="number"
              placeholder="Enter a number"
              iconName="Hash"
            />
            <Input
              label="URL"
              type="url"
              placeholder="https://example.com"
              iconName="Link"
            />
            <Input label="Color" type="color" iconName="Palette" />
          </div>
        </section>
      </div>
    </div>
  );
}
