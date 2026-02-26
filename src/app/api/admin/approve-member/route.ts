import { authOptions } from '@/lib/auth-server';
import { approveMembershipDual } from '@/lib/dual-approve-service';
import { Role } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions); 
    
    console.log('📋 Session completa:', JSON.stringify(session, null, 2));
    
    if (!session?.user) {
      console.log('❌ Usuário não autenticado');
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    if (session.user.role !== Role.ADMIN) {
      console.log('❌ Usuário sem permissão ADMIN. Role atual:', session.user.role);
      return NextResponse.json({ error: 'Acesso negado - Apenas administradores' }, { status: 403 });
    }

    console.log('✅ Usuário autorizado:', session.user.email, 'Role:', session.user.role);

    const { applicationId, discordUserId } = await request.json();

    const result = await approveMembershipDual({
      applicationId,
      adminId: session.user.id,
      discordUserId
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('💥 Erro na API:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}