import { eq, goals, type LibSQLDatabase } from '@targett/db';
import {
  goalSchema,
  type CreateGoalOutput,
  type Goal,
  type ParsedGoal,
  type UpdateGoalOutput
} from '@targett/db/schemas';

export const parseGoals = (goals: Goal[]): ParsedGoal[] => {
  return goals.map(goal => goalSchema.parse(goal));
};

interface IGoalService {
  all: (userId: string) => Promise<ParsedGoal[]>;
  byId: (id: string) => Promise<ParsedGoal>;
  create: (goal: CreateGoalOutput) => Promise<ParsedGoal>;
  update: (goal: UpdateGoalOutput) => Promise<ParsedGoal>;
  delete: (id: string) => Promise<ParsedGoal>;
}

export class GoalService implements IGoalService {
  constructor(private db: LibSQLDatabase) {}

  public async all(userId: string): Promise<ParsedGoal[]> {
    const allGoals = await this.db
      .select()
      .from(goals)
      .where(eq(goals.userId, userId))
      .all();

    return parseGoals(allGoals);
  }

  public async byId(id: string): Promise<ParsedGoal> {
    const goal = await this.db
      .select()
      .from(goals)
      .where(eq(goals.id, id))
      .get();

    if (!goal) {
      throw new Error('The goal with the given "id" does not exist.');
    }

    return goalSchema.parse(goal);
  }

  public async create(goal: CreateGoalOutput): Promise<ParsedGoal> {
    const insertedGoal = await this.db
      .insert(goals)
      .values(goal)
      .returning()
      .get();

    return goalSchema.parse(insertedGoal);
  }

  public async update(goal: UpdateGoalOutput): Promise<ParsedGoal> {
    const updatedGoal = await this.db
      .update(goals)
      .set(goal)
      .where(eq(goals.id, goal.id))
      .returning()
      .get();

    if (!updatedGoal) {
      throw new Error('The goal with the given "id" does not exist.');
    }

    return goalSchema.parse(updatedGoal);
  }

  public async delete(id: string): Promise<ParsedGoal> {
    const deletedGoal = await this.db
      .delete(goals)
      .where(eq(goals.id, id))
      .returning()
      .get();

    if (!deletedGoal) {
      throw new Error('The goal with the given "id" does not exist.');
    }

    return goalSchema.parse(deletedGoal);
  }
}
