/** Integration data for `/integrations/[slug]` programmatic pages. */
export interface Integration {
  slug: string;
  name: string;
  category: string; // "CRM" | "Email marketing" | "Automation" | "Forms" | "Spreadsheet" | "Outreach"
  blurb: string;    // what the tool is, one line
  records: string;  // what kind of records it holds, e.g. "contacts", "subscribers", "leads"
}

export const INTEGRATIONS: Integration[] = [
  { slug: "hubspot", name: "HubSpot", category: "CRM", blurb: "the all-in-one CRM and marketing platform", records: "contacts" },
  { slug: "salesforce", name: "Salesforce", category: "CRM", blurb: "the enterprise CRM of record", records: "leads and contacts" },
  { slug: "pipedrive", name: "Pipedrive", category: "CRM", blurb: "the sales-focused CRM", records: "leads" },
  { slug: "zoho-crm", name: "Zoho CRM", category: "CRM", blurb: "the budget-friendly CRM suite", records: "contacts" },
  { slug: "mailchimp", name: "Mailchimp", category: "Email marketing", blurb: "the email marketing platform", records: "subscribers" },
  { slug: "klaviyo", name: "Klaviyo", category: "Email marketing", blurb: "the ecommerce marketing platform", records: "profiles" },
  { slug: "activecampaign", name: "ActiveCampaign", category: "Email marketing", blurb: "the marketing automation platform", records: "contacts" },
  { slug: "brevo", name: "Brevo", category: "Email marketing", blurb: "the email and SMS marketing platform", records: "contacts" },
  { slug: "zapier", name: "Zapier", category: "Automation", blurb: "the no-code automation hub", records: "records" },
  { slug: "google-sheets", name: "Google Sheets", category: "Spreadsheet", blurb: "the spreadsheet your lists already live in", records: "rows" },
  { slug: "shopify", name: "Shopify", category: "Ecommerce", blurb: "the commerce platform", records: "customers" },
  { slug: "apollo", name: "Apollo", category: "Outreach", blurb: "the prospecting and outreach platform", records: "prospects" },
  { slug: "constant-contact", name: "Constant Contact", category: "Email marketing", blurb: "the small-business email platform", records: "contacts" },
  { slug: "marketo", name: "Marketo", category: "Email marketing", blurb: "the enterprise marketing automation platform", records: "leads" },
  { slug: "mailerlite", name: "MailerLite", category: "Email marketing", blurb: "the lightweight email marketing tool", records: "subscribers" },
  { slug: "make", name: "Make", category: "Automation", blurb: "the visual automation platform", records: "records" },
  { slug: "power-automate", name: "Power Automate", category: "Automation", blurb: "Microsoft's workflow automation tool", records: "records" },
  { slug: "excel", name: "Excel", category: "Spreadsheet", blurb: "the spreadsheet your lists live in", records: "rows" },
  { slug: "wordpress", name: "WordPress", category: "CMS", blurb: "the website and form platform", records: "form submissions" },
  { slug: "webflow", name: "Webflow", category: "CMS", blurb: "the visual website builder", records: "form submissions" },
  { slug: "wix", name: "Wix", category: "CMS", blurb: "the website builder", records: "contacts" },
  { slug: "woocommerce", name: "WooCommerce", category: "Ecommerce", blurb: "the WordPress commerce plugin", records: "customers" },
  { slug: "gravity-forms", name: "Gravity Forms", category: "Forms", blurb: "the WordPress forms plugin", records: "form submissions" },
  { slug: "typeform", name: "Typeform", category: "Forms", blurb: "the conversational form builder", records: "responses" },
  { slug: "jotform", name: "Jotform", category: "Forms", blurb: "the online form builder", records: "submissions" },
  { slug: "calendly", name: "Calendly", category: "Scheduling", blurb: "the scheduling platform", records: "invitees" },
  { slug: "intercom", name: "Intercom", category: "Support", blurb: "the customer messaging platform", records: "contacts" },
  { slug: "outreach", name: "Outreach", category: "Outreach", blurb: "the sales engagement platform", records: "prospects" },
  { slug: "lemlist", name: "lemlist", category: "Outreach", blurb: "the cold-email outreach tool", records: "leads" },
  { slug: "instantly", name: "Instantly", category: "Outreach", blurb: "the cold-email sending platform", records: "leads" },
  { slug: "smartlead", name: "Smartlead", category: "Outreach", blurb: "the cold-email infrastructure platform", records: "leads" },
  { slug: "mailshake", name: "Mailshake", category: "Outreach", blurb: "the sales engagement tool", records: "prospects" },
  { slug: "gohighlevel", name: "GoHighLevel", category: "CRM", blurb: "the agency CRM and marketing platform", records: "contacts" },
  { slug: "segment", name: "Segment", category: "Data", blurb: "the customer data platform", records: "identities" },
  { slug: "freshsales", name: "Freshsales", category: "CRM", blurb: "the Freshworks sales CRM", records: "contacts" },
];

export function getIntegration(slug: string) {
  return INTEGRATIONS.find((i) => i.slug === slug);
}
