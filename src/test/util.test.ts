import { it, expect, describe } from 'vitest';
import { add } from '@/utils/add';

describe('utils test', () => {
	it('100% pass', () => {
		expect(1).toBe(1);
	});
	it('add function pass 100%', () => {
		expect(add(1, 2)).toBe(3);
	});
});
