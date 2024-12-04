import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Container, Loader } from '@mantine/core';

import { vacanciesApi } from 'resources/vacancies';

import VacancyTable from './components/Table';

const Home: NextPage = () => {
  const { data: vacancies, isLoading } = vacanciesApi.useGet();

  return (
    <>
      <Head>
        <title>Vacancies Monitoring</title>
      </Head>
      <Container fluid>{isLoading ? <Loader color="gray" /> : <VacancyTable data={vacancies || []} />}</Container>
    </>
  );
};

export default Home;
