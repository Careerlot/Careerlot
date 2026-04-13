import { expect, test, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropzone from './Dropzone.jsx';

// Mock the library to return predictable text
vi.mock('react-pdftotext', () => ({
    default: vi.fn(() => Promise.resolve("Mocked PDF Text"))
}));

test('extracts text when a PDF is uploaded', async () => {
    const user = userEvent.setup();
    const onParsedFileMock = vi.fn();

    const { container } = render(<Dropzone onParsedFile={onParsedFileMock} previewUrl={null} />);

    const input = container.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });

    await user.upload(input, file);

    await waitFor(() => {
        expect(onParsedFileMock).toHaveBeenCalledWith("Mocked PDF Text", file);
    });
});
