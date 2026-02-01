
export default function Settings() {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
      <header className="w-full bg-[#111618]/95 backdrop-blur z-10 border-b border-surface-border px-8 py-5 shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#9db0b9]">Dashboard</span>
                <span className="text-[#556975] material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-white font-medium">Settings</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-1">Settings</h2>
              <p className="text-[#9db0b9] text-sm mt-1">Manage account preferences and integrations.</p>
            </div>
            <button className="flex items-center justify-center h-10 px-4 rounded-lg bg-[#283339] hover:bg-[#344148] text-white text-sm font-bold border border-[#3b4b54] transition-colors cursor-pointer">
                Save Changes
            </button>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-6">
          <div className="max-w-[1000px] mx-auto flex flex-col gap-8">
            
            {/* Profile Section */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white border-b border-surface-border pb-2">Profile & Account</h3>
                <div className="bg-surface-dark border border-surface-border rounded-xl p-6 flex flex-col gap-6">
                    <div className="flex items-center gap-6">
                         <div className="size-20 bg-center bg-no-repeat bg-cover rounded-full border-2 border-surface-border" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBZ10QVHIQQcI7awY5-99tzEuDNBlNeG0YmyQzBqsj4x3gYRN9RrWVUEM_IWQPYtOGKgIR9Oep1pQzQHjREp8U1JfewDc4dwIPMOzK358aFLYxjTNdJKHNnBUo3XnH1AnIw7NWCvY3eQkUE3ng6F3nRHnmBZawyOl2A1IcON55uTd8N6w321xjQyyJQ_4PTM08Nb3otk2nKx6wX-AaP0rbXO1GtV97xLBwD93ob2QElN1iYrPJCKCElT9H1oIVKfUX05e8SfZxFIE_c")' }}></div>
                         <div className="flex flex-col gap-2">
                             <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-bold border border-primary/20 hover:bg-primary/20 transition-colors">Change Avatar</button>
                             <span className="text-xs text-[#9db0b9]">JPG or PNG. Max 1MB.</span>
                         </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#9db0b9]">Display Name</label>
                            <input type="text" defaultValue="Coach J. Smith" className="bg-background-dark border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#9db0b9]">Email Address</label>
                            <input type="email" defaultValue="coach.j@cloud9.gg" className="bg-background-dark border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#9db0b9]">Role</label>
                            <input type="text" defaultValue="Head Coach" className="bg-background-dark border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary" />
                        </div>
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#9db0b9]">Organization</label>
                            <input type="text" defaultValue="Cloud9" className="bg-background-dark border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary" />
                        </div>
                    </div>
                </div>
            </section>

             {/* Integrations Section */}
             <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white border-b border-surface-border pb-2">Integrations</h3>
                <div className="bg-surface-dark border border-surface-border rounded-xl p-6 flex flex-col gap-6">
                    <div className="flex justify-between items-center p-4 bg-background-dark rounded-lg border border-surface-border">
                        <div className="flex items-center gap-4">
                            <div className="size-10 bg-white rounded flex items-center justify-center">
                                <span className="font-bold text-black">GRID</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-white">GRID Data Platform</span>
                                <span className="text-xs text-[#9db0b9]">Connected</span>
                            </div>
                        </div>
                        <button className="text-sm font-bold text-red-500 hover:underline">Disconnect</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#9db0b9]">GRID API Key</label>
                        <div className="flex gap-2">
                             <input type="password" defaultValue="sk_live_..." className="flex-1 bg-background-dark border border-surface-border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary font-mono" />
                             <button className="px-4 py-2 bg-surface-dark border border-surface-border rounded-lg text-sm font-bold hover:bg-white/5 transition-colors">Regenerate</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notifications Section */}
             <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white border-b border-surface-border pb-2">Notifications</h3>
                <div className="bg-surface-dark border border-surface-border rounded-xl p-6 flex flex-col gap-4">
                     <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-bold text-white">Scrim Reminders</span>
                            <span className="text-xs text-[#9db0b9]">Get notified 1 hour before scheduled blocks.</span>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                            <input type="checkbox" id="toggle1" className="peer absolute opacity-0 w-0 h-0" defaultChecked />
                            <label htmlFor="toggle1" className="block cursor-pointer w-12 h-6 bg-surface-border rounded-full peer-checked:bg-primary transition-colors before:content-[''] before:absolute before:left-1 before:bottom-1 before:bg-white before:w-4 before:h-4 before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></label>
                        </div>
                     </div>
                     <div className="h-px w-full bg-white/5"></div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="font-bold text-white">Analysis Ready</span>
                            <span className="text-xs text-[#9db0b9]">Receive an alert when AI analysis is complete.</span>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                            <input type="checkbox" id="toggle2" className="peer absolute opacity-0 w-0 h-0" defaultChecked />
                            <label htmlFor="toggle2" className="block cursor-pointer w-12 h-6 bg-surface-border rounded-full peer-checked:bg-primary transition-colors before:content-[''] before:absolute before:left-1 before:bottom-1 before:bg-white before:w-4 before:h-4 before:rounded-full before:transition-transform peer-checked:before:translate-x-6"></label>
                        </div>
                     </div>
                </div>
            </section>

          </div>
        </div>
      </main>
  );
}
