import React from "react";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-ctp-mauve mb-4">Reckord</h1>
        <p className="text-xl text-ctp-subtext0">
          A simple, privacy-focused media tracker
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-ctp-surface0 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-ctp-text mb-4">
            What is Reckord?
          </h2>
          <p className="text-ctp-subtext1 leading-relaxed">
            Reckord is a clean, straightforward media tracker that helps you
            keep track of your anime, books, and other media. Built with
            simplicity in mind, it focuses on what matters most - organizing
            your collection without the noise.
          </p>
        </div>

        <div className="bg-ctp-surface0 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-ctp-text mb-4">
            Privacy First
          </h2>
          <p className="text-ctp-subtext1 leading-relaxed">
            Everything runs entirely in your browser using local storage. No
            accounts, no data collection, no tracking. Your media collection
            stays on your device, exactly where it belongs.
          </p>
        </div>
      </div>

      <div className="bg-ctp-surface0 rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-semibold text-ctp-text mb-6 text-center">
          No Bloat, Just Features
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🚫</div>
            <h3 className="font-semibold text-ctp-text mb-2">No Accounts</h3>
            <p className="text-sm text-ctp-subtext1">
              Start tracking immediately without sign-ups
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-ctp-text mb-2">No Tracking</h3>
            <p className="text-sm text-ctp-subtext1">
              Your data never leaves your browser
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold text-ctp-text mb-2">No AI</h3>
            <p className="text-sm text-ctp-subtext1">
              No algorithmic recommendations or interference
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-ctp-text mb-2">No Bloat</h3>
            <p className="text-sm text-ctp-subtext1">
              Fast, lightweight, and focused
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold text-ctp-text mb-4">
          Ready to start tracking?
        </h3>
        <p className="text-ctp-subtext1 mb-6">
          Use the search bar above to find and add your first anime or book to
          your collection.
        </p>
        <div className="flex justify-center gap-4">
          <span
            className="px-4 py-2 bg-ctp-blue text-ctp-base rounded-lg font-medium"
            onClick={() => navigate("/anime")}
          >
            Search for Anime →
          </span>
          <span
            className="px-4 py-2 bg-ctp-green text-ctp-base rounded-lg font-medium"
            onClick={() => navigate("/books")}
          >
            Search for Books →
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
