import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { CountryInfo, PopulationData, FlagData } from './types/interfaces';

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

const corsOptions = {
  origin: `${process.env.FRONT_END_URL}`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/countries', async (req: Request, res: Response) => {
  try {
    const response = await axios.get<string[]>(
      'https://date.nager.at/api/v3/AvailableCountries'
    );
    res.status(200).json(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching available countries:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    res.status(500).json({ error: 'Failed to fetch available countries' });
  }
});

app.get('/api/countries/:countryCode', async (req: Request, res: Response) => {
  const { countryCode } = req.params;

  try {
    const countryInfoResponse = await axios.get<CountryInfo>(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );

    const countryInfo = countryInfoResponse.data;
    const countryName = countryInfo.commonName;

    // Fetch population data
    const populationResponse = await axios.get<{ data: PopulationData[] }>(
      `https://countriesnow.space/api/v0.1/countries/population`
    );
    const populationData = populationResponse.data.data.find(
      (country: PopulationData) => country.country === countryName
    );

    // // Fetch flag URL
    const flagResponse = await axios.get<{ data: FlagData[] }>(
      `https://countriesnow.space/api/v0.1/countries/flag/images`
    );
    const flagData = flagResponse.data.data.find(
      (country: FlagData) => country.name === countryName
    );

    const responseData = {
      commonName: countryName,
      officialName: countryInfo.officialName,
      countryCode: countryInfo.countryCode,
      region: countryInfo.region,
      flag: flagData?.flag,
      borders: countryInfo.borders,
      population: populationData?.populationCounts,
    };

    res.status(200).json(responseData);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Error fetching data for country ${countryCode}:`,
        error.message
      );
    } else {
      console.error('Unexpected error:', error);
    }
    res
      .status(500)
      .json({ error: `Failed to fetch data for country ${countryCode}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

