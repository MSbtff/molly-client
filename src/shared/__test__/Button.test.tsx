import '@testing-library/jest-dom';
import {Button} from '@/shared/ui/Button';
import {describe, it, expect} from '@jest/globals';
import {render, screen} from '@testing-library/react';

describe('Name of the group', () => {
  it('버튼의 children이 잘 적용돼서 나옵니다.', async () => {
    await render(<Button>버튼</Button>);
    const button = screen.getByText('버튼');
    expect(button).toBeInTheDocument();
  });
});
