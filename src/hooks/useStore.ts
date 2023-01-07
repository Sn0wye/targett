import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import create from "zustand";

export type Goal = {
  id: string;
  name: string;
  total: number;
  current: number;
};

type Store = {
  goals: Goal[] | undefined;
  setData: (data: Goal[]) => void;
  addValue: (goalName: string, total: string) => void;
  getData: () => void;
  clearStore: () => void;
  deleteValue: (id: string) => void;
};

export const useStore = create<Store>((set) => ({
  goals: [
    {
      id: '1',
      current: 12,
      name: 'Teste',
      total: 40
    }
  ],
  getData: async () => {
    try {
      const goals = await AsyncStorage.getItem("chave");
      if (goals !== null) {
        set({ goals: JSON.parse(goals) });
      }
    } catch (e) {
      console.error(e);
    }
  },
  setData: (goals) => set({ goals }),
  addValue: (goalName, total) => {
    const id = uuid.v4() as string;
    const newGoal = {
      id,
      name: goalName,
      total: Number(total),
      current: 0,
    };
    set((state) => {
      if (!state.goals) {
        return { goals: [newGoal] };
      }
      const newData = [...state.goals, newGoal];
      AsyncStorage.setItem("chave", JSON.stringify(newData));
      return { data: newData };
    });
  },
  clearStore: async () => {
    try {
      await AsyncStorage.clear();
      set({ goals: [] });
    } catch (e) {
      console.error(e);
    }
  },
  deleteValue: async (id) => {
    try {
      const data = await AsyncStorage.getItem("chave");
      if (data !== null) {
        const newGoals = JSON.parse(data).filter((item: any) => item.id !== id);
        await AsyncStorage.setItem("chave", JSON.stringify(newGoals));
        set({ goals: newGoals });
      }
    } catch (e) {
      console.error(e);
    }
  },
}));
