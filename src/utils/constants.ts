// Copyright (c) 2018-present Amal Express, Inc. All Rights Reserved.

import keyMirror from "key-mirror";

export const ActionTypes = keyMirror({
  RECEIVED_ERROR: null,

  RECEIVED_PROFILES: null,
  RECEIVED_PROFILES_IN_TEAM: null,
  RECEIVED_PROFILES_NOT_IN_TEAM: null,
  RECEIVED_PROFILE: null,
  RECEIVED_PROFILES_IN_CHANNEL: null,
  RECEIVED_PROFILES_NOT_IN_CHANNEL: null,
  RECEIVED_PROFILES_WITHOUT_TEAM: null,
  RECEIVED_ME: null,
  RECEIVED_USER: null,
  RECEIVED_REACTIONS: null,
  ADDED_REACTION: null,
  REMOVED_REACTION: null,

  RECEIVED_CONFIG: null,
  RECEIVED_SERVER_COMPLIANCE_REPORTS: null,

  RECEIVED_LOCALE: null,

  UPDATE_OPEN_GRAPH_METADATA: null,
  RECIVED_OPEN_GRAPH_METADATA: null,

  SHOW_SEARCH: null,
  SHOW_EDIT_POST_MODAL: null,
  HIDE_EDIT_POST_MODAL: null,

  BROWSER_CHANGE_FOCUS: null,

  EMOJI_POSTED: null,

  RECEIVED_PLUGIN_COMPONENTS: null,
  RECEIVED_PLUGIN_POST_TYPES: null,
  RECEIVED_PLUGIN_MENU_ACTIONS: null,
  RECEIVED_WEBAPP_PLUGINS: null,
  RECEIVED_WEBAPP_PLUGIN: null,
  REMOVED_WEBAPP_PLUGIN: null,

  STORE_REHYDRATION_FAILED: null,

  DISMISS_NOTICE: null
});

export const StorageTypes = keyMirror({
  SET_ITEM: null,
  REMOVE_ITEM: null,
  SET_GLOBAL_ITEM: null,
  REMOVE_GLOBAL_ITEM: null,
  CLEAR: null,
  ACTION_ON_GLOBAL_ITEMS_WITH_PREFIX: null,
  ACTION_ON_ITEMS_WITH_PREFIX: null,
  STORAGE_REHYDRATE: null
});

export const StoragePrefixes = {
  EMBED_VISIBLE: "isVisible_",
  COMMENT_DRAFT: "comment_draft_",
  DRAFT: "draft_",
  LOGOUT: "__logout__",
  LOGIN: "__login__",
  ANNOUNCEMENT: "__announcement__"
};

export const ErrorPageTypes = {
  LOCAL_STORAGE: "local_storage",
  OAUTH_MISSING_CODE: "oauth_missing_code",
  PAGE_NOT_FOUND: "page_not_found",
  PERMALINK_NOT_FOUND: "permalink_not_found",
  TEAM_NOT_FOUND: "team_not_found",
  CHANNEL_NOT_FOUND: "channel_not_found"
};

export const JobTypes = {
  DATA_RETENTION: "data_retention",
  ELASTICSEARCH_POST_INDEXING: "elasticsearch_post_indexing",
  LDAP_SYNC: "ldap_sync",
  MESSAGE_EXPORT: "message_export"
};

export const JobStatuses = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  SUCCESS: "success",
  ERROR: "error",
  CANCEL_REQUESTED: "cancel_requested",
  CANCELED: "canceled"
};

export const ErrorBarTypes = {
  LICENSE_EXPIRING: "error_bar.license_expiring",
  LICENSE_EXPIRED: "error_bar.license_expired",
  LICENSE_PAST_GRACE: "error_bar.past_grace",
  PREVIEW_MODE: "error_bar.preview_mode",
  SITE_URL: "error_bar.site_url",
  WEBSOCKET_PORT_ERROR: "channel_loader.socketError"
};

export const Constants = {
  ActionTypes,

  ErrorPageTypes,

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  GOOGLE_SERVICE: "google",

  EMAIL_SERVICE: "email",

  USERNAME_SERVICE: "username",
  SIGNIN_CHANGE: "signin_change",
  PASSWORD_CHANGE: "password_change",
  SIGNIN_VERIFIED: "verified",
  SESSION_EXPIRED: "expired"
};

export default Constants;
