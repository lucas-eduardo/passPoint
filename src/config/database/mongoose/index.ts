import { connect } from 'mongoose';

export default async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI as string;

    await connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (error) {
    throw error;
  }
};
