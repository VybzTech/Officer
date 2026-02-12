import Button from "@/components/ui/Button";
import {
  ArrowRight,
  Download,
  Check,
  Trash2,
  Settings,
  Send,
  Plus,
  Edit,
} from "lucide-react";

/**
 * Button Component Examples
 * Demonstrates all the features of the enhanced Button component
 */
export default function ButtonExamples() {
  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Button Component Examples</h1>

        {/* Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="gradient">Gradient</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </section>

        {/* Icons with Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Icons (Component)</h2>
          <div className="flex flex-wrap gap-4">
            <Button icon={ArrowRight}>Continue</Button>
            <Button icon={Download} variant="outline">
              Download
            </Button>
            <Button icon={Check} variant="secondary">
              Confirm
            </Button>
            <Button icon={Trash2} variant="danger">
              Delete
            </Button>
            <Button icon={Settings} variant="ghost">
              Settings
            </Button>
          </div>
        </section>

        {/* Icons with String Names */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Icons (String Names)</h2>
          <div className="flex flex-wrap gap-4">
            <Button iconName="Send">Send</Button>
            <Button iconName="Plus" variant="outline">
              Add New
            </Button>
            <Button iconName="Edit" variant="secondary">
              Edit
            </Button>
            <Button iconName="Download" variant="gradient">
              Download
            </Button>
          </div>
        </section>

        {/* Icon Positions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Icon Positions</h2>
          <div className="flex flex-wrap gap-4">
            <Button icon={ArrowRight} iconPosition="left">
              Left Icon
            </Button>
            <Button icon={ArrowRight} iconPosition="right">
              Right Icon
            </Button>
            <Button iconName="Download" iconPosition="left" variant="outline">
              Download PDF
            </Button>
            <Button iconName="Send" iconPosition="right" variant="secondary">
              Send Message
            </Button>
          </div>
        </section>

        {/* Full Width */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Full Width</h2>
          <div className="space-y-3">
            <Button fullWidth>Full Width Primary</Button>
            <Button
              fullWidth
              variant="outline"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue to Next Step
            </Button>
            <Button fullWidth variant="secondary" iconName="Download">
              Download All Files
            </Button>
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Loading States</h2>
          <div className="flex flex-wrap gap-4">
            <Button loading>Loading...</Button>
            <Button loading variant="secondary">
              Saving...
            </Button>
            <Button loading variant="outline">
              Processing...
            </Button>
            <Button loading iconName="Send">
              Sending...
            </Button>
          </div>
        </section>

        {/* Disabled States */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Disabled States</h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled</Button>
            <Button disabled variant="secondary">
              Disabled Secondary
            </Button>
            <Button disabled iconName="Lock">
              Locked
            </Button>
            <Button disabled variant="danger" iconName="Trash2">
              Cannot Delete
            </Button>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Real-World Examples</h2>
          <div className="space-y-6">
            {/* Form Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Form Actions</h3>
              <div className="flex gap-3">
                <Button variant="ghost">Cancel</Button>
                <Button variant="outline">Save Draft</Button>
                <Button iconName="Send" iconPosition="right">
                  Submit Form
                </Button>
              </div>
            </div>

            {/* Card Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Card Actions</h3>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" iconName="Edit">
                  Edit
                </Button>
                <Button size="sm" variant="outline" iconName="Share2">
                  Share
                </Button>
                <Button size="sm" variant="danger" iconName="Trash2">
                  Delete
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <div className="flex justify-between">
                <Button variant="outline" iconName="ChevronLeft">
                  Previous
                </Button>
                <Button iconName="ChevronRight" iconPosition="right">
                  Next Step
                </Button>
              </div>
            </div>

            {/* Download Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Download Options</h3>
              <div className="space-y-3">
                <Button fullWidth variant="outline" iconName="Download">
                  Download PDF
                </Button>
                <Button fullWidth variant="outline" iconName="FileText">
                  Download CSV
                </Button>
                <Button fullWidth variant="gradient" iconName="Archive">
                  Download All (ZIP)
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Icon-Only Buttons */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Icon-Only Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              iconName="Settings"
              aria-label="Settings"
              className="!px-3"
            />
            <Button
              iconName="Heart"
              variant="ghost"
              aria-label="Like"
              className="!px-3"
            />
            <Button
              iconName="Share2"
              variant="outline"
              aria-label="Share"
              className="!px-3"
            />
            <Button
              iconName="MoreVertical"
              variant="ghost"
              aria-label="More options"
              className="!px-3"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
