import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '../layouts/AppShell';
import { RoleSelectionPage } from '../pages/onboarding/RoleSelectionPage';
import { CollectorHomePage } from '../pages/collector/CollectorHomePage';
import { CollectionsPage } from '../pages/collector/CollectionsPage';
import { CollectionDetailPage } from '../pages/collector/CollectionDetailPage';
import { CollectorProfilePage } from '../pages/collector/CollectorProfilePage';
import { FutureBatchPage } from '../pages/placeholders/FutureBatchPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
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

        {/* Placeholders for subsequent batch routes */}
        <Route
          path="/collector/start"
          element={
            <AppShell showBottomNav={true}>
              <FutureBatchPage />
            </AppShell>
          }
        />
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
        <Route
          path="/collector/recyclers"
          element={
            <AppShell showBottomNav={true}>
              <FutureBatchPage />
            </AppShell>
          }
        />
        <Route
          path="/collector/handover"
          element={
            <AppShell showBottomNav={true}>
              <FutureBatchPage />
            </AppShell>
          }
        />
        <Route
          path="/collector/transactions"
          element={
            <AppShell showBottomNav={true}>
              <FutureBatchPage />
            </AppShell>
          }
        />
        <Route
          path="/recycler"
          element={
            <AppShell showBottomNav={false}>
              <FutureBatchPage />
            </AppShell>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/role-selection" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
