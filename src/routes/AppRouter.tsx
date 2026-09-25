import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../layouts/AppShell';
import { RoleSelectionPage } from '../pages/onboarding/RoleSelectionPage';
import { CollectorHomePage } from '../pages/collector/CollectorHomePage';
import { CollectionsPage } from '../pages/collector/CollectionsPage';
import { CollectionDetailPage } from '../pages/collector/CollectionDetailPage';
import { CollectorProfilePage } from '../pages/collector/CollectorProfilePage';
import { FutureBatchPage } from '../pages/placeholders/FutureBatchPage';

// Batch 2: Collection Flow
import { CollectionFlowProvider } from '../context/CollectionFlowContext';
import { CapturePhotoPage } from '../pages/collector/flow/CapturePhotoPage';
import { ClassificationResultPage } from '../pages/collector/flow/ClassificationResultPage';
import { ManualCategoryPage } from '../pages/collector/flow/ManualCategoryPage';
import { WeightEntryPage } from '../pages/collector/flow/WeightEntryPage';
import { ReviewLotPage } from '../pages/collector/flow/ReviewLotPage';
import { LotCreatedPage } from '../pages/collector/flow/LotCreatedPage';

// Batch 3: Recycler Marketplace & Handover
import { RecyclerMatchingPage } from '../pages/collector/recycler/RecyclerMatchingPage';
import { RecyclerDetailPage } from '../pages/collector/recycler/RecyclerDetailPage';
import { HandoverRequestPage } from '../pages/collector/recycler/HandoverRequestPage';

// Batch 4: Handover, Payment & Transaction Completion
import { TransactionTrackingPage } from '../pages/collector/transaction/TransactionTrackingPage';
import { TransactionsHistoryPage } from '../pages/collector/transaction/TransactionsHistoryPage';
import { RecyclerDashboardPage } from '../pages/recycler/RecyclerDashboardPage';
import { RecyclerIncomingLotsPage } from '../pages/recycler/RecyclerIncomingLotsPage';
import { RecyclerLotDetailPage } from '../pages/recycler/RecyclerLotDetailPage';
import { RecyclerReceivePage } from '../pages/recycler/RecyclerReceivePage';
import { RecyclerPaymentPage } from '../pages/recycler/RecyclerPaymentPage';
import { RecyclerCompletePage } from '../pages/recycler/RecyclerCompletePage';

/**
 * Wrapper that provides CollectionFlowContext to all flow pages.
 * The bottom nav is hidden during the collection flow (full-focus mode).
 */
const FlowShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppShell showBottomNav={false}>
    {children}
  </AppShell>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <CollectionFlowProvider>
        <Routes>
          {/* Onboarding / Role Selection (No bottom nav) */}
          <Route
            path="/"
            element={
              <AppShell showBottomNav={false}>
                <RoleSelectionPage />
              </AppShell>
            }
          />
          <Route
            path="/role-selection"
            element={
              <AppShell showBottomNav={false}>
                <RoleSelectionPage />
              </AppShell>
            }
          />

          {/* Batch 1 Collector Shell (With 4-tab bottom nav) */}
          <Route
            path="/collector"
            element={
              <AppShell showBottomNav={true}>
                <CollectorHomePage />
              </AppShell>
            }
          />
          <Route
            path="/collector/home"
            element={
              <AppShell showBottomNav={true}>
                <CollectorHomePage />
              </AppShell>
            }
          />
          <Route
            path="/collector/collections"
            element={
              <AppShell showBottomNav={true}>
                <CollectionsPage />
              </AppShell>
            }
          />
          <Route
            path="/collector/collections/:id"
            element={
              <AppShell showBottomNav={true}>
                <CollectionDetailPage />
              </AppShell>
            }
          />
          <Route
            path="/collector/profile"
            element={
              <AppShell showBottomNav={true}>
                <CollectorProfilePage />
              </AppShell>
            }
          />

          {/* ─── Batch 2: Collection Flow (No bottom nav — full focus) ─── */}
          <Route
            path="/collector/start"
            element={<Navigate to="/collector/flow/capture" replace />}
          />
          <Route
            path="/collector/flow/capture"
            element={
              <FlowShell>
                <CapturePhotoPage />
              </FlowShell>
            }
          />
          <Route
            path="/collector/flow/classify"
            element={
              <FlowShell>
                <ClassificationResultPage />
              </FlowShell>
            }
          />
          <Route
            path="/collector/flow/manual-category"
            element={
              <FlowShell>
                <ManualCategoryPage />
              </FlowShell>
            }
          />
          <Route
            path="/collector/flow/weight"
            element={
              <FlowShell>
                <WeightEntryPage />
              </FlowShell>
            }
          />
          <Route
            path="/collector/flow/review"
            element={
              <FlowShell>
                <ReviewLotPage />
              </FlowShell>
            }
          />
          <Route
            path="/collector/flow/created"
            element={
              <FlowShell>
                <LotCreatedPage />
              </FlowShell>
            }
          />

          {/* Placeholders for subsequent batch routes */}
          <Route
            path="/collector/classification"
            element={
              <AppShell showBottomNav={true}>
                <FutureBatchPage />
              </AppShell>
            }
          />
          <Route
            path="/collector/weight"
            element={
              <AppShell showBottomNav={true}>
                <FutureBatchPage />
              </AppShell>
            }
          />
          <Route
            path="/collector/pricing"
            element={
              <AppShell showBottomNav={true}>
                <FutureBatchPage />
              </AppShell>
            }
          />
          {/* ─── Batch 3: Recycler Marketplace & Handover ─── */}
          <Route
            path="/collector/recyclers"
            element={
              <AppShell showBottomNav={true}>
                <RecyclerMatchingPage />
              </AppShell>
            }
          />
          <Route
            path="/collector/recyclers/:id"
            element={
              <AppShell showBottomNav={true}>
                <RecyclerDetailPage />
              </AppShell>
            }
          />
          <Route
            path="/collector/handover"
            element={
              <AppShell showBottomNav={true}>
                <HandoverRequestPage />
              </AppShell>
            }
          />
          {/* ─── Batch 4: Collector Transactions & Recycler Console ─── */}
          <Route
            path="/collector/transactions"
            element={
              <AppShell showBottomNav={true}>
                <TransactionsHistoryPage />
              </AppShell>
            }
          />
          <Route
            path="/collector/transactions/:id"
            element={
              <AppShell showBottomNav={false}>
                <TransactionTrackingPage />
              </AppShell>
            }
          />

          {/* Recycler Console & Operations */}
          <Route
            path="/recycler"
            element={
              <AppShell showBottomNav={false}>
                <RecyclerDashboardPage />
              </AppShell>
            }
          />
          <Route
            path="/recycler/dashboard"
            element={
              <AppShell showBottomNav={false}>
                <RecyclerDashboardPage />
              </AppShell>
            }
          />
          <Route
            path="/recycler/incoming"
            element={
              <AppShell showBottomNav={false}>
                <RecyclerIncomingLotsPage />
              </AppShell>
            }
          />
          <Route
            path="/recycler/lot/:id"
            element={
              <AppShell showBottomNav={false}>
                <RecyclerLotDetailPage />
              </AppShell>
            }
          />
          <Route
            path="/recycler/incoming/:id"
            element={
              <AppShell showBottomNav={false}>
                <RecyclerLotDetailPage />
              </AppShell>
            }
          />
          <Route
            path="/recycler/receive/:id"
            element={
              <AppShell showBottomNav={false}>
                <RecyclerReceivePage />
              </AppShell>
            }
          />
          <Route
            path="/recycler/settle/:id"
            element={
              <AppShell showBottomNav={false}>
                <RecyclerPaymentPage />
              </AppShell>
            }
          />
          <Route
            path="/recycler/complete/:id"
            element={
              <AppShell showBottomNav={false}>
                <RecyclerCompletePage />
              </AppShell>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/role-selection" replace />} />
        </Routes>
      </CollectionFlowProvider>
    </BrowserRouter>
  );
};
