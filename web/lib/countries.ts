/** Country data for programmatic phone-validation pages (`/phone-validation/[country]`). */
export interface Country {
  slug: string;
  name: string;
  dial: string; // calling code
  iso: string;  // ISO-2
}

export const COUNTRIES: Country[] = [
  { slug: "united-states", name: "United States", dial: "+1", iso: "US" },
  { slug: "united-kingdom", name: "United Kingdom", dial: "+44", iso: "GB" },
  { slug: "canada", name: "Canada", dial: "+1", iso: "CA" },
  { slug: "australia", name: "Australia", dial: "+61", iso: "AU" },
  { slug: "india", name: "India", dial: "+91", iso: "IN" },
  { slug: "germany", name: "Germany", dial: "+49", iso: "DE" },
  { slug: "france", name: "France", dial: "+33", iso: "FR" },
  { slug: "spain", name: "Spain", dial: "+34", iso: "ES" },
  { slug: "italy", name: "Italy", dial: "+39", iso: "IT" },
  { slug: "netherlands", name: "Netherlands", dial: "+31", iso: "NL" },
  { slug: "brazil", name: "Brazil", dial: "+55", iso: "BR" },
  { slug: "mexico", name: "Mexico", dial: "+52", iso: "MX" },
  { slug: "united-arab-emirates", name: "United Arab Emirates", dial: "+971", iso: "AE" },
  { slug: "saudi-arabia", name: "Saudi Arabia", dial: "+966", iso: "SA" },
  { slug: "nigeria", name: "Nigeria", dial: "+234", iso: "NG" },
  { slug: "south-africa", name: "South Africa", dial: "+27", iso: "ZA" },
  { slug: "singapore", name: "Singapore", dial: "+65", iso: "SG" },
  { slug: "indonesia", name: "Indonesia", dial: "+62", iso: "ID" },
  { slug: "philippines", name: "Philippines", dial: "+63", iso: "PH" },
  { slug: "malaysia", name: "Malaysia", dial: "+60", iso: "MY" },
  { slug: "japan", name: "Japan", dial: "+81", iso: "JP" },
  { slug: "south-korea", name: "South Korea", dial: "+82", iso: "KR" },
  { slug: "sweden", name: "Sweden", dial: "+46", iso: "SE" },
  { slug: "switzerland", name: "Switzerland", dial: "+41", iso: "CH" },
  { slug: "ireland", name: "Ireland", dial: "+353", iso: "IE" },
  { slug: "poland", name: "Poland", dial: "+48", iso: "PL" },
  { slug: "turkey", name: "Turkey", dial: "+90", iso: "TR" },
  { slug: "argentina", name: "Argentina", dial: "+54", iso: "AR" },
  { slug: "colombia", name: "Colombia", dial: "+57", iso: "CO" },
  { slug: "new-zealand", name: "New Zealand", dial: "+64", iso: "NZ" },
  { slug: "belgium", name: "Belgium", dial: "+32", iso: "BE" },
  { slug: "austria", name: "Austria", dial: "+43", iso: "AT" },
  { slug: "portugal", name: "Portugal", dial: "+351", iso: "PT" },
  { slug: "greece", name: "Greece", dial: "+30", iso: "GR" },
  { slug: "norway", name: "Norway", dial: "+47", iso: "NO" },
  { slug: "denmark", name: "Denmark", dial: "+45", iso: "DK" },
  { slug: "finland", name: "Finland", dial: "+358", iso: "FI" },
  { slug: "czech-republic", name: "Czech Republic", dial: "+420", iso: "CZ" },
  { slug: "romania", name: "Romania", dial: "+40", iso: "RO" },
  { slug: "hungary", name: "Hungary", dial: "+36", iso: "HU" },
  { slug: "israel", name: "Israel", dial: "+972", iso: "IL" },
  { slug: "egypt", name: "Egypt", dial: "+20", iso: "EG" },
  { slug: "kenya", name: "Kenya", dial: "+254", iso: "KE" },
  { slug: "ghana", name: "Ghana", dial: "+233", iso: "GH" },
  { slug: "morocco", name: "Morocco", dial: "+212", iso: "MA" },
  { slug: "pakistan", name: "Pakistan", dial: "+92", iso: "PK" },
  { slug: "bangladesh", name: "Bangladesh", dial: "+880", iso: "BD" },
  { slug: "vietnam", name: "Vietnam", dial: "+84", iso: "VN" },
  { slug: "thailand", name: "Thailand", dial: "+66", iso: "TH" },
  { slug: "hong-kong", name: "Hong Kong", dial: "+852", iso: "HK" },
  { slug: "taiwan", name: "Taiwan", dial: "+886", iso: "TW" },
  { slug: "chile", name: "Chile", dial: "+56", iso: "CL" },
  { slug: "peru", name: "Peru", dial: "+51", iso: "PE" },
  { slug: "ecuador", name: "Ecuador", dial: "+593", iso: "EC" },
  { slug: "qatar", name: "Qatar", dial: "+974", iso: "QA" },
  { slug: "kuwait", name: "Kuwait", dial: "+965", iso: "KW" },
  { slug: "bahrain", name: "Bahrain", dial: "+973", iso: "BH" },
  { slug: "oman", name: "Oman", dial: "+968", iso: "OM" },
  { slug: "ukraine", name: "Ukraine", dial: "+380", iso: "UA" },
  { slug: "jordan", name: "Jordan", dial: "+962", iso: "JO" },
];

export function getCountry(slug: string) {
  return COUNTRIES.find((c) => c.slug === slug);
}

/**
 * Country phone pages are kept crawlable but OUT of the index for now: they
 * share too much templated copy to index without genuinely unique per-country
 * content (real carriers, number formats, local regulations), which we won't
 * fabricate. Re-index a country by adding it here once its page carries that
 * unique data. Empty = all parked.
 */
export const INDEXED_COUNTRIES: Country[] = COUNTRIES.slice(0, 0);
const indexedSet = new Set(INDEXED_COUNTRIES.map((c) => c.slug));
export function isCountryIndexed(slug: string) {
  return indexedSet.has(slug);
}
