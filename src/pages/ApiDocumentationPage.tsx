// ============================================
// URBAN GRAVITY - API DOCUMENTATION
// Comprehensive API reference and integration guide
// ============================================

import { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  ChevronDown,
  Search,
  ExternalLink,
  Lock,
  Zap,
  BookOpen,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";

const API_ENDPOINTS = [
  {
    title: "List Users",
    method: "GET",
    endpoint: "/api/v1/users",
    description: "Retrieve paginated list of all users",
    auth: true,
    category: "users",
  },
  {
    title: "Get User by ID",
    method: "GET",
    endpoint: "/api/v1/users/:id",
    description: "Retrieve specific user details",
    auth: true,
    category: "users",
  },
  {
    title: "Create Listing",
    method: "POST",
    endpoint: "/api/v1/listings",
    description: "Create a new property listing",
    auth: true,
    category: "listings",
  },
  {
    title: "Approve Listing",
    method: "PATCH",
    endpoint: "/api/v1/listings/:id/approve",
    description: "Approve a pending listing",
    auth: true,
    category: "listings",
  },
  {
    title: "Verify User",
    method: "POST",
    endpoint: "/api/v1/users/:id/verify",
    description: "Mark user as verified",
    auth: true,
    category: "users",
  },
  {
    title: "Process Transaction",
    method: "POST",
    endpoint: "/api/v1/transactions",
    description: "Process a new transaction",
    auth: true,
    category: "transactions",
  },
];

const CODE_EXAMPLES = {
  curl: `curl -X GET https://api.urbangravity.com/api/v1/users \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  javascript: `const response = await fetch('https://api.urbangravity.com/api/v1/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();`,
  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.urbangravity.com/api/v1/users',
    headers=headers
)
data = response.json()`,
};

export function ApiDocumentationPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof CODE_EXAMPLES>("curl");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEndpoints = API_ENDPOINTS.filter((ep) =>
    ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ep.endpoint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-700";
      case "POST":
        return "bg-success-100 text-success-700";
      case "PATCH":
        return "bg-warning-100 text-warning-700";
      case "DELETE":
        return "bg-danger-100 text-danger-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Code2 className="h-8 w-8 text-primary-500" />
          API Documentation
        </h1>
        <p className="text-gray-500 mt-1">
          Complete REST API reference and integration guide
        </p>
      </div>

      {/* Quick Start */}
      <Card padding="lg" className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Start</h2>
        <p className="text-sm text-gray-700 mb-4">
          Get your API key from Settings and use it in all requests.
        </p>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono overflow-x-auto mb-4">
          <span className="text-warning-400">Authorization:</span> Bearer YOUR_API_KEY
        </div>
        <Button variant="primary" size="sm" leftIcon={<Zap className="h-4 w-4" />}>
          Get API Key
        </Button>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="lg:col-span-1">
          <Card padding="md">
            <div className="mb-4">
              <Input
                placeholder="Search endpoints..."
                icon={Search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                inputSize="sm"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredEndpoints.map((ep, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEndpoint(idx)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-all border",
                    API_ENDPOINTS.indexOf(ep) === selectedEndpoint
                      ? "bg-primary-50 border-primary-300"
                      : "hover:bg-gray-50 border-gray-200"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getMethodColor(ep.method)}>
                      {ep.method}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold text-gray-900">
                    {ep.title}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 truncate">
                    {ep.endpoint}
                  </p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Endpoint Details */}
        <div className="lg:col-span-2 space-y-4">
          {filteredEndpoints.length > 0 && (
            <>
              <Card padding="lg">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getMethodColor(filteredEndpoints[selectedEndpoint]?.method)}>
                        {filteredEndpoints[selectedEndpoint]?.method}
                      </Badge>
                      <h2 className="text-xl font-bold text-gray-900">
                        {filteredEndpoints[selectedEndpoint]?.title}
                      </h2>
                      {filteredEndpoints[selectedEndpoint]?.auth && (
                        <Lock className="h-4 w-4 text-warning-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {filteredEndpoints[selectedEndpoint]?.description}
                    </p>
                  </div>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <span className="text-info-400">
                      {filteredEndpoints[selectedEndpoint]?.method}
                    </span>{" "}
                    {filteredEndpoints[selectedEndpoint]?.endpoint}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Parameters
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• <span className="font-mono">page</span>: Page number (default: 1)</p>
                      <p>• <span className="font-mono">limit</span>: Items per page (default: 10)</p>
                      <p>• <span className="font-mono">sort</span>: Sort field (default: createdAt)</p>
                    </div>
                  </div>

                  <div className="p-4 bg-success-50 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">
                      Response (200 OK)
                    </h3>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                      <pre>{`{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 245
  }
}`}</pre>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Code Examples */}
              <Card padding="lg">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Example Requests
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  {Object.keys(CODE_EXAMPLES).map((lang) => (
                    <Button
                      key={lang}
                      variant={selectedLanguage === lang ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang as keyof typeof CODE_EXAMPLES)}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </Button>
                  ))}
                </div>

                <div className="relative">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{CODE_EXAMPLES[selectedLanguage]}</pre>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={
                      copiedId === "code" ? (
                        <Check className="h-4 w-4 text-success-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )
                    }
                    onClick={() =>
                      handleCopy(CODE_EXAMPLES[selectedLanguage], "code")
                    }
                    className="absolute top-2 right-2"
                  />
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Authentication",
            description: "Learn how to authenticate requests",
            icon: Lock,
          },
          {
            title: "Error Handling",
            description: "Understanding error responses",
            icon: BookOpen,
          },
          {
            title: "Rate Limits",
            description: "API rate limiting guidelines",
            icon: Zap,
          },
        ].map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.title} padding="md" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    {resource.title}
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {resource.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Support */}
      <Card padding="md" className="bg-info-50 border-info-200">
        <div className="flex gap-3">
          <ExternalLink className="h-5 w-5 text-info-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-info-900">Need Help?</p>
            <p className="text-sm text-info-700 mt-1">
              Visit our developer portal or contact support@urbangravity.com for API assistance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ApiDocumentationPage;