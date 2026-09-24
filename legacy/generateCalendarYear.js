#!/usr/bin/env node

/**
 * MBSC Training Calendar Year Generator
 * 
 * This script generates a new calendar year JSON file based on the 2026 base calendar.
 * It copies all programs and adjusts dates to the target year.
 * 
 * Usage:
 *   node scripts/generateCalendarYear.js 2028
 *   npm run generate:calendar 2028
 * 
 * The script will:
 * 1. Read /public/calendars/2026.json as the base template
 * 2. Update the "year" field to the target year
 * 3. Keep all date strings as-is (day numbers stay the same, only context changes)
 * 4. Write output to /public/calendars/{year}.json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get target year from command line arguments
const targetYear = parseInt(process.argv[2], 10);

if (!targetYear || isNaN(targetYear) || targetYear < 2026 || targetYear > 2100) {
  console.error('❌ Error: Please provide a valid target year (2026-2100)');
  console.error('');
  console.error('Usage:');
  console.error('  node scripts/generateCalendarYear.js <year>');
  console.error('');
  console.error('Example:');
  console.error('  node scripts/generateCalendarYear.js 2028');
  process.exit(1);
}

// Paths
const baseCalendarPath = join(__dirname, '..', 'public', 'calendars', '2026.json');
const outputPath = join(__dirname, '..', 'public', 'calendars', `${targetYear}.json`);

// Check if base calendar exists
if (!existsSync(baseCalendarPath)) {
  console.error('❌ Error: Base calendar not found at', baseCalendarPath);
  console.error('Please ensure /public/calendars/2026.json exists.');
  process.exit(1);
}

// Check if output already exists
if (existsSync(outputPath)) {
  console.warn(`⚠️  Warning: ${targetYear}.json already exists. Overwriting...`);
}

try {
  // Read base calendar
  console.log(`📖 Reading base calendar from 2026.json...`);
  const baseCalendar = JSON.parse(readFileSync(baseCalendarPath, 'utf-8'));

  // Update year
  const newCalendar = {
    ...baseCalendar,
    year: targetYear,
  };

  // Write output
  console.log(`📝 Writing new calendar to ${targetYear}.json...`);
  writeFileSync(outputPath, JSON.stringify(newCalendar, null, 2), 'utf-8');

  console.log('');
  console.log(`✅ Successfully generated /public/calendars/${targetYear}.json`);
  console.log('');
  console.log('📋 Next steps:');
  console.log(`   1. Open /public/calendars/${targetYear}.json`);
  console.log('   2. Review and adjust dates as needed for the new year');
  console.log('   3. Update any programs that have changed');
  console.log('   4. Test by updating the TrainingCalendar source prop:');
  console.log(`      <TrainingCalendar year={${targetYear}} source="/calendars/${targetYear}.json" />`);
  console.log('');

} catch (err) {
  console.error('❌ Error generating calendar:', err.message);
  process.exit(1);
}
