import { cleanup, render, screen } from '@testing-library/react';
import Modal from './Modal';

const modalContent = 'modal content';

describe('Modal', () => {
  afterEach(cleanup);

  it('should render modal when it open', () => {
    render(<Modal isOpen={true} onClose={() => {}} content={modalContent} />);
    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });

  it('should not render modal when it close', () => {
    render(<Modal isOpen={false} onClose={() => {}} content={modalContent} />);
    expect(screen.queryByText(modalContent)).toBeNull();
  });
});