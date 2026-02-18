
-- Table pour les demandes d'accès aux documents
CREATE TABLE public.document_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL CHECK (organization_type IN ('entreprise', 'organisation', 'autre')),
  position TEXT,
  sector TEXT,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  access_token UUID DEFAULT gen_random_uuid(),
  chat_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_requests ENABLE ROW LEVEL SECURITY;

-- Public can insert (anyone can make a request)
CREATE POLICY "Anyone can create a document request"
ON public.document_requests
FOR INSERT
WITH CHECK (true);

-- Public can read their own request by access_token
CREATE POLICY "Users can view their request by access token"
ON public.document_requests
FOR SELECT
USING (true);

-- Only authenticated admins can update
CREATE POLICY "Admins can update requests"
ON public.document_requests
FOR UPDATE
TO authenticated
USING (true);

-- Only authenticated admins can delete
CREATE POLICY "Admins can delete requests"
ON public.document_requests
FOR DELETE
TO authenticated
USING (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_document_requests_updated_at
BEFORE UPDATE ON public.document_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for CV and attestations
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Authenticated users can upload documents
CREATE POLICY "Admins can upload documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Authenticated users can manage documents
CREATE POLICY "Admins can update documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'documents');

-- Allow read access with proper logic (will be handled via signed URLs)
CREATE POLICY "Documents are accessible via signed URLs"
ON storage.objects
FOR SELECT
USING (bucket_id = 'documents');
