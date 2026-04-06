import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import WorkOrderKanbanPage from "./pages/WorkOrderKanbanPage";
import WorkOrderDetailPage from "./pages/WorkOrderDetailPage";
import CustomerListPage from "./pages/CustomerListPage";
import QuotationPage from "./pages/QuotationPage";
import TechnicianViewPage from "./pages/TechnicianViewPage";
import NotFound from "./pages/NotFound";

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
            <Route path="/work-orders" element={<WorkOrderKanbanPage />} />
            <Route path="/work-orders/:id" element={<WorkOrderDetailPage />} />
            <Route path="/quotation" element={<QuotationPage />} />
            <Route path="/technician" element={<TechnicianViewPage />} />
            <Route path="/parts" element={<DashboardPage />} />
            <Route path="/finance" element={<DashboardPage />} />
            <Route path="/reports" element={<DashboardPage />} />
            <Route path="/settings" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
