
// This is a script to help migrate colors from the config file to the database
// Run this manually or via a migration process in your Supabase project

import { gymColors } from '../config/colors';
import { supabase } from '../lib/supabase';

const migrateColors = async () => {
  console.log('Starting color migration...');
  
  try {
    // Create records for each gym
    for (const [gymId, colors] of Object.entries(gymColors)) {
      console.log(`Migrating colors for gym: ${gymId}`);
      
      const { error } = await supabase
        .from('gym_colors')
        .upsert({
          gym_id: gymId,
          primary_color: colors.primary,
          secondary_color: colors.secondary
        });
      
      if (error) {
        console.error(`Error migrating colors for gym ${gymId}:`, error);
      } else {
        console.log(`Successfully migrated colors for gym: ${gymId}`);
      }
    }
    
    console.log('Color migration completed!');
  } catch (error) {
    console.error('Error during color migration:', error);
  }
};

// For development, you can run this function directly
// In production, you might want to make this a separate script
migrateColors();

/*
To run this script:
1. Make sure you're connected to your Supabase project
2. You can use ts-node to run it directly:
   npx ts-node src/scripts/migrate-colors.ts
   
   Or add a script to your package.json:
   "scripts": {
     "migrate-colors": "ts-node src/scripts/migrate-colors.ts"
   }
   
   And then run:
   npm run migrate-colors
*/
