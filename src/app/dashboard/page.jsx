import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Bell, Search, User, Sparkles } from "lucide-react";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const forts = [
    "Development",
    "Gaming",
    "Art",
    "Music",
    "Travel",
    "Fitness",
  ];

  return (
    <div className="min-h-screen bg-[#bfae9c] p-6">
      {/* Top Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-3xl font-semibold tracking-tight">Your Space ✨</h1>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vibes..."
              className="pl-9 rounded-2xl bg-white/60 backdrop-blur"
            />
          </div>

          <Button variant="ghost" size="icon" className="rounded-2xl">
            <Bell className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" className="rounded-2xl">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="rounded-3xl bg-white/70 backdrop-blur border-none shadow-xl">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/80 flex items-center justify-center shadow-inner mb-4">
                <User className="w-10 h-10 opacity-60" />
              </div>

              <h2 className="text-xl font-semibold">Soumya</h2>
              <p className="text-sm opacity-70">@vibewithsoumya</p>

              <p className="text-sm mt-3 opacity-80">
                Building cool things, chasing sunsets, and debugging life one
                bug at a time.
              </p>

              <Button className="mt-4 rounded-2xl">Edit Profile</Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Aura Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-3xl bg-white/70 backdrop-blur border-none shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-semibold">Aura Energy</h3>
              </div>

              <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-500"
                />
              </div>

              <p className="text-sm mt-3 opacity-70">Your vibe is strong today 🌙</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-3xl bg-white/70 backdrop-blur border-none shadow-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-3">
                {["New Post", "Find Friends", "Explore", "Settings"].map(
                  (item) => (
                    <Button
                      key={item}
                      variant="secondary"
                      className="rounded-2xl"
                    >
                      {item}
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Forte Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Card className="rounded-3xl bg-white/70 backdrop-blur border-none shadow-xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Your Fortes</h3>

            <div className="flex flex-wrap gap-2">
              {forts.map((fort) => (
                <motion.span
                  key={fort}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-1 rounded-full bg-white/80 text-sm shadow"
                >
                  {fort}
                </motion.span>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
