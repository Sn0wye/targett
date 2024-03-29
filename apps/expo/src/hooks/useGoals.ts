import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

export type Goal = {
  id: string;
  name: string;
  total: number;
  current: number;
};

type Store = {
  goals: Goal[] | undefined;
  setData: (data: Goal[]) => void;
  createNewGoal: (goal: Pick<Goal, 'name' | 'total'>) => void;
  getGoals: () => Promise<void>;
  clearStore: () => void;
  deleteGoal: (id: Goal['id']) => void;
  updateCurrent: (id: Goal['id'], current: Goal['current']) => void;
  updateGoal: (id: Goal['id'], goal: Partial<Goal>) => void;
};

const useTeste = () => {
  return 'Funciona!';
};

export const useGoals = create<Store>((set, get) => {
  const teste = useTeste();
  console.log(teste);

  return {
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
    createNewGoal: async goal => {
      const id = nanoid();
      const newGoal = {
        id,
        name: goal.name,
        total: goal.total,
        current: 0
      };

      const previousGoals = get().goals;

      if (!previousGoals) {
        set({ goals: [newGoal] });
        return;
      }

      const newData = [...previousGoals, newGoal];
      try {
        await AsyncStorage.setItem('@targett-goals', JSON.stringify(newData));
        set({ goals: newData });
      } catch (e) {
        console.error(e);
      }
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
          const goals: Goal[] = JSON.parse(data);
          const newGoals = goals.filter(item => item.id !== id);
          if (goals.length !== newGoals.length) {
            await AsyncStorage.setItem(
              '@targett-goals',
              JSON.stringify(newGoals)
            );
            set({ goals: newGoals });
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    updateCurrent: async (id, current) => {
      try {
        const data = await AsyncStorage.getItem('@targett-goals');
        if (data !== null) {
          const newGoals: Goal[] = JSON.parse(data).map((item: Goal) => {
            if (item.id === id) {
              return { ...item, current };
            }
            return item;
          });
          await AsyncStorage.setItem(
            '@targett-goals',
            JSON.stringify(newGoals)
          );
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
          const newGoals: Goal[] = JSON.parse(data).map((item: Goal) => {
            if (item.id === id) {
              return { ...item, ...goal };
            }
            return item;
          });
          await AsyncStorage.setItem(
            '@targett-goals',
            JSON.stringify(newGoals)
          );
          set({ goals: newGoals });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
});
