import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { CountryInfo, PopulationData, FlagData } from '../types/interfaces';

dotenv.config();

const countryRouter = express.Router();

countryRouter.get('/', async (req: Request, res: Response) => {
  try {
    const response = await axios.get<string[]>(`${process.env.COUNTRIES}`);
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

countryRouter.get('/:countryCode', async (req: Request, res: Response) => {
  const { countryCode } = req.params;

  try {
    const countryInfoResponse = await axios.get<CountryInfo>(
      `${process.env.COUNTRY_INFO}/${countryCode}`
    );

    const countryInfo = countryInfoResponse.data;
    const countryName = countryInfo.commonName;

    // Fetch population data
    const populationResponse = await axios.get<{ data: PopulationData[] }>(
      `${process.env.POPULATION}`
    );
    const populationData = populationResponse.data.data.find(
      (country: PopulationData) => country.country === countryName
    );

    // Fetch flag URL
    const flagResponse = await axios.get<{ data: FlagData[] }>(
      `${process.env.FLAG}`
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

export default countryRouter;

