'use client';
import React, { useEffect, useState } from 'react';
import { Page } from '@/utils/nocodelowcode/types';
import PageShow from '../Page/Page';
import MyTabs from '../MyTab/MyTab';
import { f_loadPageListFromGroupID } from '@/utils/nocodelowcode/nocodelowcodeUtils';

export default function PageTabs({ PageGroupID }: { PageGroupID: number }) {
  const [pages, setPages] = useState<Page[]>([]);

  const loadPageList = async () => {
    let result = await f_loadPageListFromGroupID({ PageGroupID: PageGroupID });
    setPages(result);
  };
  useEffect(() => {
    loadPageList();
  }, []);

  return (
    <div style={{ width: '100%' }}>
     {pages.length > 1 && <MyTabs defaultActiveTab={0}>
        {pages.map((page: Page) => (         
            <MyTabs.Tab title={page.Description ?? 'Blank'}>
              <PageShow pageId={page.PageID} />
            </MyTabs.Tab>        
        ))}
      </MyTabs>}
      {
        pages.length === 1 && <PageShow pageId={pages[0].PageID} />
      }
    </div>
  );
}
