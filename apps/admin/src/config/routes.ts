export const enum ROUTES {
  BotNotifications = '/bot_notifications',
  Settings = '/settings',
  Login = '/login',

  Achievements = '/achievements',
  AchievementsCreate = '/achievements/create',
  AchievementsUpdate = '/achievements/update',

  Users = '/users',
  UserHistory = '/users/history',

  Admins = '/admins',
  AdminsCreate = '/admins/create',
  AdminsUpdate = '/admins/update',

  TaskControl = '/tasks',
  TaskCreate = '/tasks/create',
  TaskUpdate = '/tasks/update',

  ExcursionCreate = '/excursion/create',
  ExcursionUpdate = '/excursion/update',
}

export const enum MODALS {
  CheckNotification = 'check_notification',
  DeleteAchievement = 'delete_achievement',
  DeleteAdmin = 'delete_admin',
  DeleteAllAchievements = 'delete_all_achievements',
  DeleteAllUsers = 'delete_all_users',
  DeleteExcursion = 'delete_excursion',
  DeleteExcursionUsers = 'delete_excursion_users',
  DeleteTask = 'delete_task',
  DeleteUser = 'delete_User',
}
