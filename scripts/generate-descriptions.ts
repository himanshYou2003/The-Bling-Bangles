
import fs from 'fs';
import path from 'path';
import { BANGLES } from '../lib/bangles-data';

const outputDir = path.join(process.cwd(), 'public', 'description');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating description files...');

BANGLES.forEach((bangle) => {
  const bangleDir = path.join(outputDir, bangle.id.toString());
  
  if (!fs.existsSync(bangleDir)) {
    fs.mkdirSync(bangleDir, { recursive: true });
  }

  const data = {
    id: bangle.id,
    name: bangle.name,
    description: bangle.description,
    category: bangle.category,
    type: bangle.type || bangle.category,
    style: bangle.style || 'Modern',
    finish: bangle.finish || 'Glossy',
    material: bangle.material || 'Premium Gold',
    occasion: bangle.occasion || 'All Occasions',
    image: bangle.image,
    images: bangle.images || [bangle.image]
  };

  fs.writeFileSync(
    path.join(bangleDir, 'data.json'),
    JSON.stringify(data, null, 2)
  );
  
  console.log(`Created description for bangle ${bangle.id}`);
});

console.log('All description files generated successfully!');
