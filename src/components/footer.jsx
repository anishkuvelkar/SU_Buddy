import React from 'react';

export default function Footer() {
    return (
      <footer className="bg-white bg-opacity-50 text-center dark:bg-white lg:text-left py-0.5 fixed bottom-0 w-full">
        <div className="flex justify-start items-center space-x-4 text-white pl-4"> {/* Adjusted alignment and added left padding */}
          <p className="text-sm text-orange-500 hover:text-orange-400">© 2023 SU_Buddy. All Rights Reserved.</p>
        </div>
      </footer>
    );
}
