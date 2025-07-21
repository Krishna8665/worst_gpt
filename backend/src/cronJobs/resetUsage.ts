// cronJobs/resetUsage.ts
import cron from 'node-cron';
import Usage from '../models/Usage';

// Runs every day at midnight (00:00)
cron.schedule('0 0 * * *', async () => {
  try {
    console.log('⏰ Running daily usage reset check');

    const now = new Date();

    const usersToReset = await Usage.find({
      resetDate: { $lte: now },
      isPremium: false // Optional: skip premium users if they have unlimited use
    });

    for (const usage of usersToReset) {
      usage.credits = 100;
      usage.resetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Next reset after 30 days
      await usage.save();
      console.log(`✅ Reset usage for user ${usage.userId}`);
    }
  } catch (error) {
    console.error('❌ Error running usage reset cron job:', error);
  }
});
