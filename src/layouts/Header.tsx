// ============================================
// URBAN GRAVITY - HEADER
// Top navigation with search, notifications, profile
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Shield,
  HelpCircle,
  Sun,
  Moon,
  Command,
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { cn } from '@/utils/cn';
import { getInitials } from '@/utils/format';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const navigate = useNavigate();
  const { officer, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock notifications
  const notifications = [
    { id: 1, type: 'verification', message: 'New verification request from John Doe', time: '2 min ago', unread: true },
    { id: 2, type: 'upgrade', message: 'Subscription upgrade pending approval', time: '15 min ago', unread: true },
    { id: 3, type: 'dispute', message: 'Dispute #1234 requires attention', time: '1 hour ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="hidden sm:block relative">
          <div
            className={cn(
              'flex items-center gap-2 rounded-lg border bg-surface-raised px-3 py-2',
              'transition-all duration-200',
              searchFocused
                ? 'border-primary-500 ring-2 ring-primary-500/20 w-80'
                : 'border-sidebar-border w-64'
            )}
          >
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-500 outline-none"
            />
            <kbd className="hidden lg:flex items-center gap-1 rounded bg-sidebar-hover px-1.5 py-0.5 text-xs text-gray-500">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
          title={darkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Help */}
        <button
          className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
          title="Help & Support"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileMenuOpen(false);
            }}
            className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
            title="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationsOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-50 w-80 rounded-xl border border-sidebar-border bg-surface-raised shadow-xl animate-fade-in">
                <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <button className="text-xs text-primary-400 hover:text-primary-300">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'flex items-start gap-3 p-4 hover:bg-sidebar-hover cursor-pointer transition-colors',
                        notification.unread && 'bg-primary-500/5'
                      )}
                    >
                      <div className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg',
                        notification.type === 'verification' && 'bg-success/10 text-success',
                        notification.type === 'upgrade' && 'bg-primary-500/10 text-primary-400',
                        notification.type === 'dispute' && 'bg-warning/10 text-warning'
                      )}>
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          'text-sm',
                          notification.unread ? 'text-white' : 'text-gray-400'
                        )}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {notification.unread && (
                        <div className="h-2 w-2 rounded-full bg-primary-500" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-sidebar-border">
                  <button className="w-full py-2 text-sm text-center text-primary-400 hover:text-primary-300 rounded-lg hover:bg-sidebar-hover transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileMenuOpen(!profileMenuOpen);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-sidebar-hover transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-semibold text-sm">
              {officer ? getInitials(officer.firstName, officer.lastName) : 'UG'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-white">
                {officer ? `${officer.firstName} ${officer.lastName}` : 'Officer'}
              </p>
              <p className="text-xs text-gray-500">
                {officer?.role.replace('_', ' ') ?? 'Role'}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {/* Profile Dropdown */}
          {profileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setProfileMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-sidebar-border bg-surface-raised shadow-xl animate-fade-in">
                {/* Profile Header */}
                <div className="p-4 border-b border-sidebar-border">
                  <p className="font-semibold text-white">
                    {officer ? `${officer.firstName} ${officer.lastName}` : 'Officer'}
                  </p>
                  <p className="text-sm text-gray-500">{officer?.email}</p>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate('/account/profile');
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate('/account/security');
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Security
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate('/config/app');
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-sidebar-hover transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="p-2 border-t border-sidebar-border">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
