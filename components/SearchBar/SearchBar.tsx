import React from 'react';
import { StarTwoTone } from '@ant-design/icons';
import { Button, Collapse, Descriptions, Empty, Input, Spin } from 'antd';
import { RepoData, User } from './SearchBarTypes';

import styles from './SearchBar.module.scss';

type SearchBarProps = {
  data?: User[];
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onActiveChange?: (key: string | string[]) => void;
  repoData?: RepoData[];
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const { Search } = Input;
  const { data, onChange, onClick, onActiveChange, repoData } = props;

  const panelStyle = {
    marginBottom: 24,
    border: '1px solid #1677ff',
  };

  const contentStyle = {
    marginBottom: 24,
    borderBottom: '1px solid #1677ff',
  };

  const getInfo = () => (
    <Descriptions
      // className={styles.DescWrapper}
      title="Repository Info"
      layout="horizontal"
      // column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      bordered
      // contentStyle={contentStyle}
    >
      {repoData?.map((repos: RepoData, idx: number) => (
        <>
          <Descriptions.Item label="name" span={3}>
            {repos?.name}
          </Descriptions.Item>
          <Descriptions.Item label="description" span={3}>
            {repos?.description}
          </Descriptions.Item>
          {/* <div className={styles.StarWrapper}> */}
          <Descriptions.Item
            label="star"
            span={3}
            contentStyle={contentStyle}
            labelStyle={contentStyle}
          >
            <StarTwoTone />
            {repos?.stargazers_count}
          </Descriptions.Item>
          {/* </div> */}
        </>
      ))}
    </Descriptions>
  );

  const getItemsSearch = () => {
    return data?.map((item: User, idx: number) => ({
      key: item.login,
      label: item.login,
      children:
        repoData && repoData?.length > 0 ? getInfo() : <Spin size="small" />,
      style: panelStyle,
    }));
  };
  return (
    <>
      <div className={styles.SearchContainer}>
        <Search
          data-testid="search-id"
          onChange={onChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onClick;
            }
          }}
          onSearch={onClick}
        />
        <Button
          className={styles.ButtonWrapper}
          type="primary"
          onClick={onClick}
        >
          Search
        </Button>
      </div>
      {data && data.length > 0 ? (
        <Collapse
          bordered={false}
          accordion
          items={getItemsSearch()}
          onChange={onActiveChange}
          className={styles.ContentWrapper}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default SearchBar;
