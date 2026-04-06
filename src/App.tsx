import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import WorkOrderKanbanPage from "./pages/WorkOrderKanbanPage";
import WorkOrderDetailPage from "./pages/WorkOrderDetailPage";
import WorkOrderCreatePage from "./pages/WorkOrderCreatePage";
import CustomerListPage from "./pages/CustomerListPage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerFormPage from "./pages/CustomerFormPage";
import QuotationPage from "./pages/QuotationPage";
import QuotationListPage from "./pages/QuotationListPage";
import QuotationDetailPage from "./pages/QuotationDetailPage";
import PriceListPage from "./pages/PriceListPage";
import InspectionPage from "./pages/InspectionPage";
import JobAssignmentPage from "./pages/JobAssignmentPage";
import TechnicianViewPage from "./pages/TechnicianViewPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CommissionPage from "./pages/CommissionPage";
import CommissionSettingsPage from "./pages/CommissionSettingsPage";
import CommissionReportPage from "./pages/CommissionReportPage";
import NotFound from "./pages/NotFound";
import ReportsPage from "./pages/ReportsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomerListPage />} />
            <Route path="/customers/:id" element={<CustomerDetailPage />} />
            <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
            <Route path="/customers/new" element={<CustomerFormPage />} />
            <Route path="/work-orders" element={<WorkOrderKanbanPage />} />
            <Route path="/work-orders/create" element={<WorkOrderCreatePage />} />
            <Route path="/work-orders/:id" element={<WorkOrderDetailPage />} />
            <Route path="/work-orders/:id/inspection" element={<InspectionPage />} />
            <Route path="/job-assignment" element={<JobAssignmentPage />} />
            <Route path="/quotations" element={<QuotationListPage />} />
            <Route path="/quotations/:id" element={<QuotationDetailPage />} />
            <Route path="/quotations/create" element={<QuotationDetailPage />} />
            <Route path="/quotation" element={<QuotationPage />} />
            <Route path="/price-list" element={<PriceListPage />} />
            <Route path="/technician" element={<TechnicianViewPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/commission" element={<CommissionPage />} />
            <Route path="/commission/settings" element={<CommissionSettingsPage />} />
            <Route path="/commission/report" element={<CommissionReportPage />} />
            <Route path="/parts" element={<DashboardPage />} />
            <Route path="/finance" element={<DashboardPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
