'use client';
import { useState, useCallback } from 'react';
import { ComponentAttribute, Field, Form, Page, PageComponent } from './types';
import { f_load_pivotedData, f_loadComponentAttributes, f_loadComponents, f_loadFieldList, f_loadFormDetail, f_loadFormList, f_loadPageList, f_loadRelationshipList, f_insertRelationship, f_updateRelationship, f_deleteRelationship, f_loadTwoTableRelationship } from './nocodelowcodeUtils';
export const useF_loadFormList = () => {
  const [data, setData] = useState<Form[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await f_loadFormList();
    setData(result);
  }, []);
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, triggerFetch };
};
export const useF_loadFieldList = (DATA: any) => {
  const [data, setData] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await f_loadFieldList(DATA);
    setData(result);
  }, [DATA]);
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, triggerFetch };
};
export const useF_loadPageList = (DATA: any) => {
  const [data, setData] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await f_loadPageList(DATA);
    setData(result);
  }, [DATA]);
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, triggerFetch };
};
export const useF_loadComponents = (DATA: any) => {
  const [data, setData] = useState<PageComponent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(
    async (params?: any) => {
      setLoading(true);
      setError(null);
      const result = await f_loadComponents(params ?? DATA);
      setData(result);
    },
    [DATA]
  );
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  const triggerFetchWithParams = useCallback(
    (params: any) => {
      fetchData(params);
    },
    [fetchData]
  );
  return { data, loading, error, triggerFetch, triggerFetchWithParams };
};
export const useF_loadComponentAttributes = (DATA: any) => {
  const [data, setData] = useState<ComponentAttribute[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(
    async (params?: any) => {
      setLoading(true);
      setError(null);
      const result = await f_loadComponentAttributes(params ?? DATA);
      setData(result);
    },
    [DATA]
  );
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  const triggerFetchWithParams = useCallback(
    (params: any) => {
      fetchData(params);
    },
    [fetchData]
  );
  return { data, loading, error, triggerFetch, triggerFetchWithParams };
};
export const useF_loadFormDetail = (DATA: any) => {
  const [data, setData] = useState<Form[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await f_loadFormDetail(DATA);
    setData(result);
  }, [DATA]);
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, triggerFetch };
};

export const useF_load_pivotedData = (DATA: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await f_load_pivotedData(DATA);
    setData(result);
  }, [DATA]);
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, triggerFetch };
};

// Relationship hooks

export const useF_loadRelationshipList = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await f_loadRelationshipList();
    setData(result);
  }, []);
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  return { data, loading, error, triggerFetch };
};

export const useF_insertRelationship = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState<string>("");
  const insert = useCallback(async (DATA: any) => {
    setLoading(true);
    setError(null);
    const res = await f_insertRelationship(DATA);
    setResult(res);
    setLoading(false);
    return res;
  }, []);
  return { insert, loading, error, result };
};

export const useF_updateRelationship = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState<string>("");
  const update = useCallback(async (DATA: any) => {
    setLoading(true);
    setError(null);
    const res = await f_updateRelationship(DATA);
    setResult(res);
    setLoading(false);
    return res;
  }, []);
  return { update, loading, error, result };
};

export const useF_deleteRelationship = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState<string>("");
  const deleteRel = useCallback(async (DATA: any) => {
    setLoading(true);
    setError(null);
    const res = await f_deleteRelationship(DATA);
    setResult(res);
    setLoading(false);
    return res;
  }, []);
  return { deleteRel, loading, error, result };
};

export const useF_loadTwoTableRelationship = (parentTableId: number, childTableId: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await f_loadTwoTableRelationship({ParentTableID: parentTableId, ChildTableID: childTableId});
    setData(result);
  }, [parentTableId, childTableId]);
  const triggerFetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  const triggerFetchWithParams = useCallback(
    async (parentTableId: number, childTableId: number) => {
      setLoading(true);
      setError(null);
      const result = await f_loadTwoTableRelationship({ParentTableID: parentTableId, ChildTableID: childTableId});
      setData(result);
    },
    []
  );
  return { data, loading, error, triggerFetch, triggerFetchWithParams };
};
