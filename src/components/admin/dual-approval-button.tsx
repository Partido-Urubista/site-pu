'use client';

import { Badge } from '@/components/ui-external/shadcn-ui/badge';
import { Button } from '@/components/ui-external/shadcn-ui/button';
import { Input } from '@/components/ui-external/shadcn-ui/input';
import { Label } from '@/components/ui-external/shadcn-ui/label';
import { useDualApproval } from '@/hooks/admin/use-dual-approve';

import { Check, Mail, MessageCircle, Send, X } from 'lucide-react';
import { useState } from 'react';

interface DualApprovalButtonProps {
  applicationId: string;
  youtubeId: string;
  email: string;
  discordId?: string;
}

export function DualApprovalButton({ 
  applicationId, 
  youtubeId, 
  email,
  discordId 
}: DualApprovalButtonProps) {
  const [discordUserId, setDiscordUserId] = useState(discordId || '');
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  
  const { mutate: approve, isPending, isSuccess, data } = useDualApproval();

  const handleApprove = () => {
    approve({
      applicationId,
      discordUserId: discordUserId.trim() || undefined
    });
  };

  if (isSuccess && data) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-green-400">
          <Check size={16} />
          <span>Aprovado!</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="bg-green-600 text-white">
            <Mail size={12} className="mr-1" />
            Email ✓
          </Badge>
          {data.discordSent && (
            <Badge variant="secondary" className="bg-blue-600 text-white">
              <MessageCircle size={12} className="mr-1" />
              Discord ✓
            </Badge>
          )}
        </div>
        
        <div className="text-xs text-gray-400">
          Enviado para: {data.email}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button
          onClick={() => setShowApprovalForm(!showApprovalForm)}
          variant="outline"
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Send size={16} className="mr-1" />
          {showApprovalForm ? 'Cancelar' : 'Aprovar'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <X size={16} className="mr-1" />
          Rejeitar
        </Button>
      </div>

      {showApprovalForm && (
        <div className="flex flex-col gap-3 p-4 bg-gray-800 rounded-lg border border-gray-600">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-green-400">
              <Mail size={14} />
              <span className="text-sm">Email: {email}</span>
            </div>
          </div>
          
          <div>
            <Label className="text-white text-sm flex items-center gap-1">
              <MessageCircle size={14} />
              ID do Discord (opcional):
            </Label>
            <Input
              value={discordUserId}
              onChange={(e) => setDiscordUserId(e.target.value)}
              placeholder="123456789012345678"
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>

          <div className="bg-gray-700 p-3 rounded text-xs text-gray-300">
            <strong>🎯 Estratégia Dupla:</strong>
            <ul className="mt-1 space-y-1">
              <li>• <strong>Email:</strong> Sempre enviado (obrigatório)</li>
              <li>• <strong>Discord:</strong> Se tiver ID, envia DM + email</li>
              <li>• <strong>Cobertura 100%:</strong> Camarada sempre recebe!</li>
            </ul>
          </div>

          <Button
            onClick={handleApprove}
            disabled={isPending}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            {isPending ? 'Enviando...' : '🚩 Aprovar e Enviar (Email + Discord)'}
          </Button>
        </div>
      )}
    </div>
  );
}