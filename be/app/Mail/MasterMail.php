<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MasterMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $subjectData;
    public $viewName;
    public $payload;

    /**
     * Create a new message instance.
     */
    public function __construct($subject, $view, array $data = [])
    {
        $this->subjectData = $subject;
        $this->viewName = $view;
        $this->payload = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subjectData,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.' . $this->viewName, // Controller sends "kichHoatTK", view is at "emails/kichHoatTK"
            with: ['data' => $this->payload], // Truyền vào blade dưới biến $data để khớp template hiện tại
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
