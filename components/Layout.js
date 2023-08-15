"use client";

export default function Layout( { children }){
    return (
        <div className="flex h-screen bg-gradient-to-b from-indigo-400 to-cyan-900">
            <div className="m-auto bg-slate-50 rounded-md w-1/4 h-3/4">
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                        {children}
                    </div>
                </div>
            </div>
  
        </div>
    )
}