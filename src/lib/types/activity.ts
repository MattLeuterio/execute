/**
 * Activity feed domain types
 * Tracks and displays recent activities in the system
 */

import { ActivityType } from './common';

/**
 * ActivityEntity - What the activity relates to
 */
export type ActivityEntity =
  | { type: 'client'; id: string; name: string }
  | { type: 'plan'; id: string; name: string; clientId: string }
  | { type: 'checkin'; id: string; clientId: string; weight?: number }
  | { type: 'note'; id: string; clientId: string }
  | { type: 'adherence'; clientId: string; date: Date };

/**
 * ActivityItem - Single activity entry for dashboard feed
 * Tells the story of what's happening with clients
 */
export interface ActivityItem {
  id: string;
  type: ActivityType;
  entity: ActivityEntity;
  description: string;
  clientName: string;
  clientId: string;
  timestamp: Date;
  metadata?: {
    change?: number; // For adherence drops
    fromValue?: string | number;
    toValue?: string | number;
  };
  isRead: boolean;
  severity: 'info' | 'warning' | 'alert';
}

/**
 * ActivityFeed - Paginated collection of activities
 */
export interface ActivityFeed {
  items: ActivityItem[];
  totalCount: number;
  hasMore: boolean;
  cursor?: string;
}

/**
 * Input for creating an activity
 */
export interface CreateActivityInput {
  type: ActivityType;
  entity: ActivityEntity;
  description: string;
  metadata?: ActivityItem['metadata'];
  severity?: 'info' | 'warning' | 'alert';
}

/**
 * ActivityFilter - Options for filtering activity feed
 */
export interface ActivityFilter {
  types?: ActivityType[];
  entityType?: 'client' | 'plan' | 'checkin' | 'note' | 'adherence';
  clientId?: string;
  severity?: 'info' | 'warning' | 'alert';
  dateRange?: {
    from: Date;
    to: Date;
  };
  unreadOnly?: boolean;
}
