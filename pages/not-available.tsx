import type { NextPage } from 'next';

const NotAvailable: NextPage = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col-reverse lg:flex-row gap-20 p-12">
        <iframe
          width="338"
          height="600"
          src="https://www.youtube.com/embed/ZwBpfGNzwT4?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-24 h-24 mb-2 text-warning"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-5xl font-bold">Tip Tap</h1>
          <p className="py-6 font-bold">
            Only available on mobile. Access mobile device!
          </p>
          <p className="py-6">
            Select a mode, tap on the screen! Tip-Tap is a collection of simple
            games that an play with fingers for Drawing Lots.
          </p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.producthunt.com/posts/tip-tap-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tip&#0045;tap&#0045;2"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=355143&theme=light"
              alt="Tip&#0032;Tap - Select&#0032;a&#0032;mode&#0044;&#0032;tap&#0032;on&#0032;the&#0032;screen&#0033;&#0032;For&#0032;Drawing&#0032;Lots&#0046; | Product Hunt"
              style={{ width: '250px', height: '54px' }}
              width="250"
              height="54"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotAvailable;
