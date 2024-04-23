import { createSelector } from 'reselect';

// export interface RootState {
//     homeItems: HomeItem[]
//     lists: TodoListItem[]
//     notifications: NotificationItem[]
//     settings: Settings
// }

export const createAppSelector = createSelector.withTypes<any>()

export const selectHomeItems = createAppSelector(
    [
        state => state.homeItems
    ],
    homeItems => homeItems
)

export const selectLists = createAppSelector(
    [
        state => state.lists
    ],
    lists => lists
)

export const selectNotifications = createAppSelector(
    [
        state => state.notifications
    ],
    notifications => notifications
)

export const selectSettings = createAppSelector(
    [
        state => state.settings
    ],
    settings => settings
)
