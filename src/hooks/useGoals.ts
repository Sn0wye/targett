import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import create from 'zustand';

export type Goal = {
  id: string;
  name: string;
  total: number;
  current: number;
};

type Store = {
  goals: Goal[] | undefined;
  setData: (data: Goal[]) => void;
  addGoal: (goalName: string, total: string) => void;
  getGoals: () => void;
  clearStore: () => void;
  deleteGoal: (id: string) => void;
  updateCurrent: (id: string, current: number) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
};

export const useGoals = create<Store>((set, get) => ({
  goals: [],
  getGoals: async () => {
    try {
      const goals = await AsyncStorage.getItem('@targett-goals');
      if (goals !== null) {
        set({ goals: JSON.parse(goals) });
      }
    } catch (e) {
      console.error(e);
    }
  },
  setData: goals => set({ goals }),
  addGoal: async (goalName, total) => {
    const id = uuid.v4() as string;
    const newGoal = {
      id,
      name: goalName,
      total: Number(total),
      current: 0
    };

    const previousGoals = get().goals;

    if (!previousGoals) {
      set({ goals: [newGoal] });
      return;
    }

    const newData = [...previousGoals, newGoal];
    await AsyncStorage.setItem('@targett-goals', JSON.stringify(newData));
    set({ goals: newData });
  },
  clearStore: async () => {
    try {
      await AsyncStorage.clear();
      set({ goals: [] });
    } catch (e) {
      console.error(e);
    }
  },
  deleteGoal: async id => {
    try {
      const data = await AsyncStorage.getItem('@targett-goals');
      if (data !== null) {
        const newGoals = JSON.parse(data).filter((item: any) => item.id !== id);
        await AsyncStorage.setItem('@targett-goals', JSON.stringify(newGoals));
        set({ goals: newGoals });
      }
    } catch (e) {
      console.error(e);
    }
  },
  updateCurrent: async (id, current) => {
    try {
      const data = await AsyncStorage.getItem('@targett-goals');
      if (data !== null) {
        const newGoals = JSON.parse(data).map((item: Goal) => {
          if (item.id === id) {
            return { ...item, current };
          }
          return item;
        });
        await AsyncStorage.setItem('@targett-goals', JSON.stringify(newGoals));
        set({ goals: newGoals });
      }
    } catch (e) {
      console.error(e);
    }
  },
  updateGoal: async (id, goal) => {
    try {
      const data = await AsyncStorage.getItem('@targett-goals');
      if (data !== null) {
        const newGoals = JSON.parse(data).map((item: Goal) => {
          if (item.id === id) {
            return { ...item, ...goal };
          }
          return item;
        });
        await AsyncStorage.setItem('@targett-goals', JSON.stringify(newGoals));
        set({ goals: newGoals });
      }
    } catch (e) {
      console.error(e);
    }
  }
}));
