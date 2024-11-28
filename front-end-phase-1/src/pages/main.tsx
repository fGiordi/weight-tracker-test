import { useState } from 'react';
import { LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { AddWeight } from '@/components/custom/AddWeight';
import { WeightList } from '@/components/custom/WeightList';
import { Button } from '@/components/ui/button';

export function Main() {
  const [showAddWeight, setShowAddWeight] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-[600px] mx-auto min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-center">Weight Tracker</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="space-y-6">
          <Button
            onClick={() => setShowAddWeight(!showAddWeight)}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            {showAddWeight ? 'Hide Form' : 'Add Weight'}
          </Button>

          {showAddWeight && (
            <div className="mb-6 mx-4">
              <AddWeight />
            </div>
          )}

          <WeightList />
        </div>
      </div>
    </div>
  );
}