import 'dotenv/config';
import slugify from 'slugify';
import dataSource from '../db/data-source';

const AppDataSource = dataSource;

async function run() {
  await AppDataSource.initialize();
  console.log('Connected to DB');

  const repo = AppDataSource.getRepository('Product');

  const items = await repo.find();

  for (const item of items) {
    if (item.slug) continue; 

    const baseSlug = slugify(`${item.name}-${item.id}`, {
      lower: true,
      strict: true,
    });

    item.slug = baseSlug;
    await repo.save(item);

    console.log(`✔ Updated slug for ID ${item.id}: ${baseSlug}`);
  }

  console.log('Done!');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
