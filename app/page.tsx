'use client';
import { useState } from 'react';
import { SearchBar } from '@/components';
import axiosConfig from '@/services/axiosConfig';

import styles from './page.module.scss';
import { RepoData } from '@/components/SearchBar/SearchBarTypes';
interface Repository {
  id: number;
  name: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [userData, setUserData] = useState([]);
  const [repositories, setRepositories] = useState<RepoData[]>([]);

  const searchUsers = async () => {
    try {
      const response = await axiosConfig.get(
        `search/users?q=${name}&per_page=5`,
      );
      setUserData(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const getRepositories = async (username: string | string[]) => {
    try {
      const response = await axiosConfig.get(`users/${username}/repos`);
      setRepositories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    if (userData?.length > 0) {
      setUserData([]);
    }
  };

  const onSearchName = () => {
    searchUsers();
  };

  const onActiveChange = (key: string | string[]) => {
    console.log(key);
    getRepositories(key[0]);
  };

  return (
    <main className={styles.main}>
      <SearchBar
        onChange={onChangeName}
        onClick={onSearchName}
        data={userData}
        onActiveChange={onActiveChange}
        repoData={repositories}
      />
    </main>
  );
}
