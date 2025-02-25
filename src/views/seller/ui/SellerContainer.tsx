'use client';

import {AppSidebar} from '../components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';
import {Separator} from './separator';
import {SidebarInset, SidebarProvider, SidebarTrigger} from './sidebar';

import {useSellerStore} from '../../../app/provider/Sellerstore';
import {ProductRegister} from '../components/ProductRegister';
import {ProductDashboard} from '../components/ProductDashboard';
import {ProductRetriever} from '../components/ProductRetriever';
import {ProductModify} from '../components/ProductModify';
import {ProductDelete} from '../components/ProductDelete';
import {Pageable, ProductData} from '../../../../app/seller/page';

export interface SellerContainerProps {
  productRes: {
    pageable: Pageable;
    data: ProductData[];
  };
}

export default function SellerContainer({productRes}: SellerContainerProps) {
  const {currentView} = useSellerStore();

  const viewComponents = {
    '상품 삭제': <ProductDelete />,
    '상품 수정': <ProductModify productRes={productRes} />,
    '상품 조회': <ProductRetriever productRes={productRes} />,
    '상품 등록': <ProductRegister />,
    기본: <ProductDashboard />,
  };

  const renderContent = () => {
    viewComponents[currentView as keyof typeof viewComponents];
    return viewComponents[currentView] || viewComponents.기본;
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">상품관리</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentView}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
