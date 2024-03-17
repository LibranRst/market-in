import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/Breadcrumb';

const DynamicBreadcrumb = ({ pageName = '' }) => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split('/')
    .filter((segment) => segment !== '');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === pathSegments.length - 1 ? (
                <BreadcrumbPage className="first-letter:uppercase">
                  {pageName ? pageName : segment}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                  className="first-letter:uppercase"
                >
                  {segment}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
