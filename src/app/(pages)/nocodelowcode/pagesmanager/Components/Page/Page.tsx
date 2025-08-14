'use client';
import { useEffect } from 'react';
import { useF_loadComponents } from '@/utils/nocodelowcode/nocodelowcodeHooks';
import FormComponent from '../Form/FormComponent';
import TableComponent from '../Table/TableComponent';
import TableFromQueryComponent from '../Table/TableFromQueryComponent';
export default function PageShow({ pageId }: { pageId: string | number }) {
  const { data: components, loading: loadingComponents, error: errorComponents, triggerFetch: fetchComponents, triggerFetchWithParams: triggerFetchComponentsWithParams } = useF_loadComponents({ PageID: pageId });
  useEffect(() => {
    fetchComponents();
  }, [pageId]);
  return (
    <div
      style={{
        width: '100%',    
        height: '95vh'  ,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '10px',     
        background: 'linear-gradient(to bottom, #f5f5f5, #8cfa60)',
        overflowY: 'auto',
      }}
    >
      {components.map((component) => {
        return (
          <div
            className='page-component'
            key={component.ComponentID}
            style={{
              gridColumn: component.GridWidth === 'full' ? 'span 3' : component.GridWidth === 'half' ? 'span 2' : 'span 1',
              gridRow: `span 1`,              
             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              padding: '10px',
              border: '1px solid #ccc',
            }}
          >
            {component.ComponentType === 'Form' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', height: '100%' }}>
                <h4>{component.ComponentName}</h4>
                <FormComponent formId={component.ReferenceID ?? 0} />
              </div>
            )}
            {component.ComponentType === 'FormFromQuery' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', height: '100%' }}>
                <h4>{component.ComponentName}</h4>
                <TableFromQueryComponent queryName='loadBlockingData' />
              </div>
            )}
            {component.ComponentType === 'DataTable' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', height: '100%' }}>
                <h4>{component.ComponentName}</h4>
                <TableComponent formID={component.ReferenceID ?? 0} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
