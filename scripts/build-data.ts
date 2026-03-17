import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.resolve(__dirname, '../content');
const outputDir = path.resolve(__dirname, '../src/generated');

async function buildData() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Parse site config
  const siteFile = path.join(contentDir, 'site.md');
  const siteContent = fs.readFileSync(siteFile, 'utf-8');
  const site = matter(siteContent).data;

  // Parse all trip files
  const tripFiles = await glob('trips/*.md', { cwd: contentDir });
  const trips = tripFiles
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      return {
        ...data,
        slug: path.basename(file, '.md'),
      };
    })
    .sort((a, b) => {
      // Sort by startDate descending (newest first)
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

  // Write output
  const output = { site, trips };
  fs.writeFileSync(
    path.join(outputDir, 'data.json'),
    JSON.stringify(output, null, 2),
    'utf-8'
  );

  console.log(`✅ Built data.json with ${trips.length} trips`);
}

buildData().catch((err) => {
  console.error('❌ Build data failed:', err);
  process.exit(1);
});
